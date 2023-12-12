import React from "react";

interface Skill {
  name: string;
  proficiency: number; // Use a value between 0 and 100 for the percentage
}

interface Skillset {
  title: string;
  skills: Skill[];
}

interface SkillsetSectionProps {
  skillsets: Skillset[];
}

const SkillsetSection: React.FC<SkillsetSectionProps> = ({ skillsets }) => {
  const renderRadialProgressBar = (percentage: number) => {
    const strokeWidth = 7;
    const radius = 13;
    const circumference = 2 * Math.PI * radius;

    const progress = circumference - (percentage / 100) * circumference;

    return (
      <svg height="80" width="80" className="mr-2">
        <circle
          strokeWidth={strokeWidth}
          fill="var(--neon)"
          r={radius}
          cx="40"
          cy="40"
          stroke="rgb(185 28 28)"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset: progress }}
        />
      </svg>
    );
  };

  return (
    <div className=" w-full p-6 rounded-md shadow-md flex backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-4">Skillset</h2>
          <div className="flex items-stretch w-full">
            {skillsets.map((skillset, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{skillset.title}</h3>
          <ul className="list-disc list-inside">
            {skillset.skills.map((skill, skillIndex) => (
              <li key={skillIndex} className="flex items-center mb-2">
                {renderRadialProgressBar(skill.proficiency)}
                <span className="font-semibold">{skill.name}</span>
                <span className="ml-auto text-gray-500">{`${skill.proficiency}%`}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}   
          </div>
     
    </div>
  );
};

export default SkillsetSection;
