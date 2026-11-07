import Image from "next/image";

const GitHubHeatmap: React.FC = () => {
  return (
    <div
      aria-label="GitHub statistics and contribution heatmap; scroll horizontally to view"
      className="mx-auto w-full max-w-5xl overflow-x-auto"
      role="region"
      tabIndex={0}
    >
      <Image
        alt="AJ4200 GitHub statistics, including public commits from the past year, and contribution heatmap. Visit the GitHub profile for detailed contribution counts."
        className="h-auto w-full min-w-[48rem]"
        height={417}
        src="/github-stats.svg"
        unoptimized
        width={860}
      />
    </div>
  );
};

export default GitHubHeatmap;
