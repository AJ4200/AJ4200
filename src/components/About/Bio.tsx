import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaProjectDiagram,
} from "react-icons/fa";
import SkillsetSection from "./SkillSet";
import { skillsets } from "@/data/bio";
import Game from "./Game";
import Producing from "./Production";
import { calculateAge } from "@/lib/utils";

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
  const [activeTab, setActiveTab] = useState("main");

  const handleTabClick = (tabValue: string) => {
    setActiveTab(tabValue);
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-shadow max-w-[30%] space-y-4"
      >
        <motion.div
          className="mb-4 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.img
            src={imageUrl}
            alt={`Image of ${name}`}
            className="mr-4 h-16 w-16 rounded-full"
          />
          <motion.h1 className="text-2xl font-bold">{name}</motion.h1>
        </motion.div>
        <motion.p className="text-darkshadow text-lg text-white">
          <span>{calculateAge(1999)} years old,</span>
          <span className="text-darkshadow text-red-700">{occupation}</span>
        </motion.p>
        <motion.p className="text-md my-4">{description}</motion.p>
        <div className="hobbies">
          <motion.p className="text-darkoutline mb-2 text-lg font-bold text-gray-300">
            Hobbies:
            {activeTab || activeTab === "main" ? (
              <span className="text-sm text-red-700">
                click on a hobby below
              </span>
            ) : (
              ""
            )}
          </motion.p>
          <ul className="list-disc pl-6">
            {hobbies.map((hobby, index) => (
              <motion.li
                key={index}
                className={`text-darkshadow m-2 text-gray-400 ${activeTab === hobby ? "text-outline text-red-700" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveTab(hobby);
                }}
              >
                {hobby}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="social-links mt-4">
          <motion.p className="mb-2 font-bold">Connect with me:</motion.p>
          <ul className="text-darkshadow flex space-x-4">
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
            className="text-darkshadow flex w-max items-center rounded-md bg-red-500 px-4 py-2 text-white"
          >
            <FaEnvelope className="mr-2" />
            Contact Me
          </motion.a>
          <motion.a
            href={`/portfolio`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="text-darkshadow flex w-max items-center rounded-md border border-red-500 px-4 py-2 text-red-500"
          >
            <FaProjectDiagram className="mr-2" />
            My Portfolio
          </motion.a>
        </div>
      </motion.div>
      <div className="w-[70%] rounded-md shadow-md backdrop-blur-md">
        {activeTab === "main" && (
          <motion.span
            className="text-darkoutline flex h-full w-full items-center justify-center bg-black/5 text-center text-8xl text-gray-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          >
            Hobbies
          </motion.span>
        )}
        {activeTab === "Coding" && <SkillsetSection skillsets={skillsets} />}
        {activeTab === "Gaming" && <Game />}
        {activeTab === "Production" && <Producing />}
      </div>
    </>
  );
};

export default Bio;
