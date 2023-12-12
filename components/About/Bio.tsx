import { motion } from "framer-motion";
import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaProjectDiagram,
} from "react-icons/fa";

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
    <div>
      <div className=" flex items-center mb-4">
        <img
          src={imageUrl}
          alt={`Image of ${name}`}
          className=" w-16 h-16 rounded-full mr-4"
        />
        <h1 className="text-2xl font-bold">{name}</h1>
      </div>
      <p className="text-lg text-white text-darkshadow">
        <span>{age} years old,</span>
        <span className="text-red-700 text-darkshadow">{occupation}</span>
      </p>
      <p className="text-md my-4">{description}</p>
      <div className="hobbies">
        <p className="text-red-700 font-bold mb-2 text-darkshadow">Hobbies:</p>
        <ul className="list-disc pl-6">
          {hobbies.map((hobby, index) => (
            <li key={index} className="text-gray-700 text-darkshadow">
              {hobby}
            </li>
          ))}
        </ul>
      </div>
      <div className="social-links mt-4">
        <span>___________________________________</span>
        <p className="font-bold mb-2">Connect with me:</p>
        <ul className="flex space-x-4 text-darkshadow">
          {socialLinks.linkedin && (
            <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500"
              >
                <FaLinkedin />
                Linkedin
              </a>
            </motion.li>
          )}
          {socialLinks.github && (
            <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500"
              >
                <FaGithub />
                Githbub
              </a>
            </motion.li>
          )}
        </ul>
      </div>{" "}
      <span>___________________________________</span>
      <div className="mt-4 flex space-x-2">
        <motion.a
          href={`/contact`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center w-max text-darkshadow"
        >
          <FaEnvelope className="mr-2" />
          Contact Me
        </motion.a>
        <motion.a
          href={`/portfolio`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className=" border border-red-500 text-red-500 py-2 px-4 rounded-md flex items-center w-max text-darkshadow"
        >
          <FaProjectDiagram className="mr-2" />
          My Portfolio
        </motion.a>
      </div>
    </div>
  );
};

export default Bio;
