declare namespace Externals {
  namespace Github {
    interface ApiResponse {
      // Define your API response structure here
      // For example:
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: number;
            weeks: {
              contributionDays: {
                contributionCount: number;
                date: string;
              }[];
            }[];
          };
        };
      };
    }
  }
}
