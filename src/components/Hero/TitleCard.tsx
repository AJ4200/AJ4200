import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import DynamicTitle from "../Utils/DynamicTitle";
import Decrypt from "../Utils/Decrypt";

const TitleCard = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto backdrop-blur-md">
      <div>
        <h3 className="text-4xl md:text-6xl font-semibold text-shadow">
          Hello, I'm <span className="text-indigo-500">Abel</span>
        </h3>
        <span className="mb-4 text-lg md:text-md text-indigo-500 font-medium">
          <DynamicTitle />
        </span>

        <p className="text-base md:text-md text-slate-500 my-4 md:my-6 hover:text-slate-100 transition-colors duration-400"
        >
          I'm a software engineer with experience in designing, building and
          scaling software, However i specialize in full stack development.
          Additionally, I possess skills in creative fields such as
          cinematography, music production and game development. Pursued a BSc
          degree at the University of Johannesburg, I take on small projects to
          further hone my skills. As a hobbyist, I develop mods for games, make
          music, and compete in online hackathon tournaments.
        </p>
  <Decrypt/>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "imgs/AppoFlex.png",
  },
  {
    id: 2,
    src: "imgs/csb.png",
  },
  {
    id: 3,
    src: "imgs/CommonFunLib.png",
  },
  {
    id: 4,
    src: "imgs/die.png",
  },
  {
    id: 5,
    src: "imgs/gsw.png",
  },
  {
    id: 6,
    src: "imgs/hdfplayer.png",
  },
  {
    id: 7,
    src: "imgs/Portyfolio.png",
  },
  {
    id: 8,
    src: "imgs/TeslaResume.png",
  },
  {
    id: 9,
    src: "imgs/TimeWhere.png",
  },
  {
    id: 10,
    src: "imgs/ttp.png",
  },
  {
    id: 11,
    src: "imgs/ttt.png",
  },
  {
    id: 12,
    src: "imgs/CodeShifter.png",
  },
  {
    id: 13,
    src: "imgs/Mi-Projects.png",
  },
  {
    id: 14,
    src: "imgs/intraview.png",
  },
  {
    id: 15,
    src: "imgs/taskme.png",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        clipPath:
          "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<any>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default TitleCard;
