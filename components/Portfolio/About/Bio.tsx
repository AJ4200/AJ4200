import React from "react";

interface BioProps {
  name: string;
  age: number;
  occupation: string;
  description: string;
  imageUrl: string;
  hobbies: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  email: string;
}

const Bio: React.FC<BioProps> = ({
  name,
  age,
  occupation,
  description,
  imageUrl,
  hobbies,
  socialLinks,
  email,
}) => {
  return (
    <div className=" bg-gray-100 p-6 rounded-lg shadow-md">
      <div className=" flex items-center mb-4">
        <img
          src={imageUrl}
          alt={`Image of ${name}`}
          className=" w-16 h-16 rounded-full mr-4"
        />
        <h1 className="text-2xl font-bold">{name}</h1>
      </div>
      <p className="text-sm text-gray-600">
        {`${age} years old, ${occupation}`}
      </p>
      <p className="text-md my-4">{description}</p>
      <div className="hobbies">
        <p className="font-bold mb-2">Hobbies:</p>
        <ul className="list-disc pl-6">
          {hobbies.map((hobby, index) => (
            <li key={index} className="text-gray-700">
              {hobby}
            </li>
          ))}
        </ul>
      </div>
      <div className="social-links mt-4">
        <p className="font-bold mb-2">Connect with me:</p>
        <ul className="flex space-x-4">
          {socialLinks.twitter && (
            <li>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500"
              >
                Twitter
              </a>
            </li>
          )}
          {socialLinks.linkedin && (
            <li>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500"
              >
                LinkedIn
              </a>
            </li>
          )}
          {socialLinks.github && (
            <li>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500"
              >
                GitHub
              </a>
            </li>
          )}
        </ul>
      </div>
      <div className="mt-4">
        <a
          href={`/contact`}
          className="bg-red-500 text-white py-2 px-4 rounded-md"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
};

export default Bio;
