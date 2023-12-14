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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <motion.div
        className="flex items-center mb-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.img
          src={imageUrl}
          alt={`Image of ${name}`}
          className="w-16 h-16 rounded-full mr-4"
        />
        <motion.h1 className="text-2xl font-bold">{name}</motion.h1>
      </motion.div>
      <motion.p className="text-lg text-white text-darkshadow">
        <span>{age} years old,</span>
        <span className="text-red-700 text-darkshadow">{occupation}</span>
      </motion.p>
      <motion.p className="text-md my-4">{description}</motion.p>
      <div className="hobbies">
        <motion.p className="text-red-700 font-bold mb-2 text-darkshadow">
          Hobbies:
        </motion.p>
        <ul className="list-disc pl-6">
          {hobbies.map((hobby, index) => (
            <motion.li
              key={index}
              className="text-gray-400 text-darkshadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {hobby}
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="social-links mt-4">
        <motion.p className="font-bold mb-2">Connect with me:</motion.p>
        <ul className="flex space-x-4 text-darkshadow">
          {socialLinks.linkedin && (
            <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <motion.a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500"
              >
                <FaLinkedin />
                Linkedin
              </motion.a>
            </motion.li>
          )}
          {socialLinks.github && (
            <motion.li whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
              <motion.a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500"
              >
                <FaGithub />
                Github
              </motion.a>
            </motion.li>
          )}
        </ul>
      </div>
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
          className="border border-red-500 text-red-500 py-2 px-4 rounded-md flex items-center w-max text-darkshadow"
        >
          <FaProjectDiagram className="mr-2" />
          My Portfolio
        </motion.a>
      </div>
    </motion.div>
  );
};

export default Bio;
