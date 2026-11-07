import { writeFile } from "node:fs/promises";

const username = "AJ4200";
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "AJ4200-github-stats",
  "X-GitHub-Api-Version": "2022-11-28",
};

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

async function getJson(url) {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(15000) });
  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status} ${response.statusText} (${url})`);
  }
  return response.json();
}

async function getOwnedRepositories() {
  const repositories = [];
  for (let page = 1; ; page += 1) {
    const url = `https://api.github.com/users/${username}/repos?type=owner&per_page=100&page=${page}`;
    const result = await getJson(url);
    if (!Array.isArray(result)) {
      throw new Error("GitHub API returned an invalid repository list");
    }
    repositories.push(...result);
    if (result.length < 100) return repositories;
  }
}

async function getSearchCount(type) {
  const query = encodeURIComponent(`author:${username} type:${type} is:public`);
  const result = await getJson(`https://api.github.com/search/issues?q=${query}&per_page=1`);
  if (!Number.isSafeInteger(result.total_count) || result.incomplete_results !== false) {
    throw new Error(`GitHub API returned an incomplete or invalid ${type} count`);
  }
  return result.total_count;
}

async function getContributionCalendar() {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error("GITHUB_TOKEN is required to fetch the contribution calendar");
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query ($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays { date contributionCount contributionLevel }
              }
            }
          }
        }
      }`,
      variables: { login: username },
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) {
    throw new Error(`GitHub GraphQL request failed: ${response.status} ${response.statusText}`);
  }
  const result = await response.json();
  if (result.errors?.length) {
    throw new Error(`GitHub GraphQL error: ${result.errors.map((error) => error.message).join(", ")}`);
  }
  const calendar = result.data?.user?.contributionsCollection?.contributionCalendar;
  const levels = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"];
  if (
    !calendar ||
    !Number.isSafeInteger(calendar.totalContributions) ||
    !Array.isArray(calendar.weeks) ||
    calendar.weeks.length < 52 ||
    calendar.weeks.length > 54 ||
    calendar.weeks.some((week) =>
      !Array.isArray(week.contributionDays) ||
      week.contributionDays.length < 1 ||
      week.contributionDays.length > 7 ||
      week.contributionDays.some((day) =>
        !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
        !Number.isSafeInteger(day.contributionCount) ||
        day.contributionCount < 0 ||
        !levels.includes(day.contributionLevel)
      )
    )
  ) {
    throw new Error("GitHub API returned an invalid contribution calendar");
  }
  return calendar;
}

const [repositories, pullRequests, issues, calendar] = await Promise.all([
  getOwnedRepositories(),
  getSearchCount("pr"),
  getSearchCount("issue"),
  getContributionCalendar(),
]);

if (repositories.some((repo) => !Number.isSafeInteger(repo.stargazers_count))) {
  throw new Error("GitHub API returned an invalid star count");
}

const stars = repositories.reduce((total, repo) => total + repo.stargazers_count, 0);
const stats = [
  ["PUBLIC REPOS", repositories.length],
  ["REPO STARS", stars],
  ["PULL REQUESTS", pullRequests],
  ["ISSUES", issues],
];

const cards = stats.map(([label, value], index) => {
  const x = 28 + index * 205;
  return `  <g transform="translate(${x} 96)">
    <rect width="192" height="91" rx="5" fill="#111021" stroke="#31294a"/>
    <path d="M0 0h44" stroke="${index % 2 === 0 ? "#a78bfa" : "#7cffb2"}" stroke-width="2"/>
    <text x="15" y="26" fill="#b9b4c9" font-size="10" letter-spacing="1.2">${label}</text>
    <text x="15" y="68" fill="#f3efff" font-size="34" font-weight="700">${value.toLocaleString("en-US")}</text>
  </g>`;
}).join("\n");

const colors = {
  NONE: "#202032",
  FIRST_QUARTILE: "#315b51",
  SECOND_QUARTILE: "#438f70",
  THIRD_QUARTILE: "#5dc990",
  FOURTH_QUARTILE: "#7cffb2",
};
const months = [];
let lastMonth = "";
let lastMonthX = -Infinity;
const cells = calendar.weeks.flatMap((week, weekIndex) =>
  week.contributionDays.map((day) => {
    const date = new Date(`${day.date}T00:00:00Z`);
    const x = 52 + weekIndex * 14;
    const y = 267 + date.getUTCDay() * 14;
    const month = day.date.slice(0, 7);
    if (month !== lastMonth && x - lastMonthX >= 42) {
      months.push(`<text x="${x}" y="255" fill="#b9b4c9" font-size="10">${date.toLocaleString("en-US", { month: "short", timeZone: "UTC" })}</text>`);
      lastMonthX = x;
    }
    lastMonth = month;
    return `<rect x="${x}" y="${y}" width="10" height="10" rx="2" fill="${colors[day.contributionLevel]}"><title>${day.date}: ${day.contributionCount} contributions</title></rect>`;
  }),
).join("\n    ");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="860" height="417" viewBox="0 0 860 417" role="img" aria-labelledby="title description" font-family="Arial, sans-serif">
  <title id="title">AJ4200 GitHub signal</title>
  <desc id="description">${repositories.length} public repositories, ${stars} stars on owned public repositories, ${pullRequests} public pull requests, ${issues} public issues, and ${calendar.totalContributions} contributions in the last year.</desc>
  <rect width="860" height="417" rx="8" fill="#080913"/>
  <path d="M0 0h860" stroke="#a78bfa" stroke-width="2"/>
  <circle cx="33" cy="38" r="4" fill="#7cffb2"/>
  <text x="46" y="42" fill="#c6b5ff" font-size="11" font-weight="700" letter-spacing="2">OPEN SOURCE / DAILY SIGNAL</text>
  <text x="28" y="76" fill="#fff" font-size="24" font-weight="700" letter-spacing="1">AJ4200 ON GITHUB</text>
  <text x="832" y="42" text-anchor="end" fill="#9d99b2" font-size="10" letter-spacing="1">PUBLIC PROFILE</text>
  <g font-family="Arial, sans-serif">
${cards}
  </g>
  <path d="M28 211h804" stroke="#302a42"/>
  <text x="28" y="235" fill="#f3efff" font-size="14" font-weight="700">${calendar.totalContributions.toLocaleString("en-US")} CONTRIBUTIONS</text>
  <text x="832" y="235" text-anchor="end" fill="#b9b4c9" font-size="10" letter-spacing="1">LAST YEAR</text>
  <g font-family="Arial, sans-serif">
    ${months.join("\n    ")}
    <text x="28" y="292" fill="#b9b4c9" font-size="9">M</text>
    <text x="28" y="320" fill="#b9b4c9" font-size="9">W</text>
    <text x="28" y="348" fill="#b9b4c9" font-size="9">F</text>
    ${cells}
  </g>
  <text x="28" y="397" fill="#b9b4c9" font-size="10">Stars on owned public repos / PRs and issues authored on GitHub</text>
  <text x="692" y="397" fill="#b9b4c9" font-size="10">Less</text>
  ${Object.values(colors).map((color, index) => `<rect x="${724 + index * 15}" y="387" width="10" height="10" rx="2" fill="${color}"/>`).join("\n  ")}
  <text x="806" y="397" fill="#b9b4c9" font-size="10">More</text>
</svg>
`;

await writeFile(new URL("../public/github-stats.svg", import.meta.url), svg);
console.log(`Updated GitHub stats for ${username}.`);
