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

const [repositories, pullRequests, issues] = await Promise.all([
  getOwnedRepositories(),
  getSearchCount("pr"),
  getSearchCount("issue"),
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
  const x = 28 + (index % 2) * 260;
  const y = 104 + Math.floor(index / 2) * 94;
  return `  <g transform="translate(${x} ${y})">
    <rect width="244" height="82" rx="4" fill="#111021" stroke="#302a4b"/>
    <text x="14" y="24" fill="#a5a0bc" font-size="12" letter-spacing="1">${label}</text>
    <text x="14" y="61" fill="#7cffb2" font-size="30" font-weight="700">${value}</text>
  </g>`;
}).join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="320" viewBox="0 0 560 320" role="img" aria-labelledby="title description">
  <title id="title">AJ4200 GitHub statistics</title>
  <desc id="description">${repositories.length} public repositories, ${stars} stars on owned public repositories, ${pullRequests} public pull requests and ${issues} public issues.</desc>
  <rect width="560" height="320" rx="6" fill="#05050b"/>
  <path d="M28 34h28" stroke="#7cffb2" stroke-width="3"/>
  <text x="28" y="67" fill="#9b7bff" font-family="Arial, sans-serif" font-size="21" font-weight="700">AJ4200 / GITHUB SIGNAL</text>
  <text x="28" y="86" fill="#a5a0bc" font-family="Arial, sans-serif" font-size="11" letter-spacing="1">PUBLIC ACTIVITY</text>
  <g font-family="Arial, sans-serif">
${cards}
  </g>
  <text x="28" y="307" fill="#777287" font-family="Arial, sans-serif" font-size="10">Stars on owned public repositories. PRs and issues authored on GitHub.</text>
</svg>
`;

await writeFile(new URL("../public/github-stats.svg", import.meta.url), svg);
console.log(`Updated GitHub stats for ${username}.`);
