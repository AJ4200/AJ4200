// Import necessary packages
import { useEffect, useState } from "react";

// GitHub API endpoint for contributions
const API_ENDPOINT = "https://api.github.com/users/aj4200/contributions";

// Define the GitHubHeatmap component
const GitHubHeatmap: React.FC = () => {
  const [contributions, setContributions] = useState<number[]>([]);

  useEffect(() => {
    // Fetch GitHub contribution data
    fetch(API_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        // Extract daily contribution counts
        const dailyContributions = data.map((day: any) => day.count);
        setContributions(dailyContributions);
      })
      .catch((error) => console.error("Error fetching GitHub data:", error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">GitHub Contribution Heatmap</h2>
      <div className="grid grid-cols-7 gap-2">
        {contributions.map((count, index) => (
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
