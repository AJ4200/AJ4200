import { useEffect, useState } from "react";
import { retrieveContributionData } from "../../lib/github";

const GitHubHeatmap: React.FC = () => {
  const [contributions, setContributions] = useState<number[]>([]);

  useEffect(() => {
    // Replace GitHub API fetch with GraphQL query
    retrieveContributionData("aj4200")
      .then((data) => {
        // Extract daily contribution counts
        const weeklyContributions =
          data.user?.contributionsCollection?.contributionCalendar?.weeks || [];
        const dailyContributions = weeklyContributions.flatMap((week) =>
          week.contributionDays.map((day) => day.contributionCount)
        );
        setContributions(dailyContributions);
            console.log(contributions);
      })  
      .catch((error) => console.error("Error fetching GitHub data:", error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">GitHub Contribution Heatmap</h2>
      <div className="grid grid-cols-7 gap-2">
        {contributions &&  contributions.map((count, index) => (
          <div
            key={index}
            className={`w-5 h-5 bg-gray-300 ${count > 0 ? "bg-green-500" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GitHubHeatmap;
