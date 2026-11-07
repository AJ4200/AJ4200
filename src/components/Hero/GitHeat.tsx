import Image from "next/image";

const GitHubHeatmap: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Image
        alt="AJ4200 GitHub statistics: public repositories, stars, pull requests, and issues"
        className="h-auto w-full"
        height={320}
        src="/github-stats.svg"
        unoptimized
        width={560}
      />
    </div>
  );
};

export default GitHubHeatmap;
