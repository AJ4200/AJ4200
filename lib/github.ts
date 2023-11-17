import axios from 'axios';

const TOKEN = "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";
const query = `
  query($userName: String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export async function retrieveContributionData(
  userName: string
): Promise<Externals.Github.ApiResponse> {
  const variables = {
    userName,
  };

  try {
    const response = await axios.post(
      'https://api.github.com/graphql',
      {
        query,
        variables,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error:any) {
  throw new Error(
    `Error fetching GitHub data. Status: ${error.response.status}. Message: ${error.response.data.message}`
  );

  }
}
