import Image from "next/image";

const GitHubHeatmap: React.FC = () => {
  return (
    <div className="mt-4 backdrop-blur-sm w-[90%]">
      <Image
        alt="AJ4200 GitHub statistics"
        className="h-auto w-full"
        height={400}
        src="https://github-readme-stats.vercel.app/api?username=aj4200&show_icons=true&theme=transparent&hide_border=true"
        unoptimized
        width={1000}
      />
    </div>
  );
};

export default GitHubHeatmap;
