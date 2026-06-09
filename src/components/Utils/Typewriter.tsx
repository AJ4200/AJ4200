import { useEffect, useState } from "react";

interface TypewriterProps {
  typedWords: string[];
}

const Typewriter: React.FC<TypewriterProps> = ({ typedWords }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [textPos, setTextPos] = useState(0);

  useEffect(() => {
    const speed = 100;
    const scrollAt = 20;

    const typewriter = () => {
      let contents = " ";
      let row = Math.max(0, index - scrollAt);

      while (row < index) {
        contents += typedWords[row++] + "<br />";
      }

      setText(contents + typedWords[index].substring(0, textPos) + "_");

      if (textPos === typedWords[index].length) {
        setTextPos(0);
        setIndex((prevIndex) => prevIndex + 1);

        if (index !== typedWords.length) {
          setTimeout(typewriter, 500);
        }
      } else {
        setTimeout(typewriter, speed);
      }
    };

    typewriter();
  }, [index, textPos, typedWords]);

  return <p id="typedtext" dangerouslySetInnerHTML={{ __html: text }} />;
};

export default Typewriter;
