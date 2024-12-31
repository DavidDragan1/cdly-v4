import React, { useState, useEffect } from "react";

interface WordRevealEffectProps {
  text: string;
  highlightColor: string;
  speed: number;
}

const WordRevealEffect: React.FC<WordRevealEffectProps> = ({
  text,
  highlightColor,
  speed,
}) => {
  const [revealedText, setRevealedText] = useState<string[]>([]);
  const [highlightIndex, setHighlightIndex] = useState<number>(0);

  useEffect(() => {
    // Reset state when text changes
    setRevealedText([]);
    setHighlightIndex(0);

    const words = text.split(" ");
    let currentIndex = -1;

    // Set an interval to reveal the words one by one
    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setRevealedText((prevText) => [...prevText, words[currentIndex]]);
        setHighlightIndex(currentIndex+1);
        currentIndex++;
      } else {
        clearInterval(interval); // Stop when all words are revealed
      }
    }, speed);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [text, speed]);

  return (
    <>
      {revealedText.map((word, index) => (
        <span
          key={index}
          className={`${index === highlightIndex ? highlightColor : ""}`}
        >
          {word}{" "}
        </span>
      ))}
    </>
  );
};

export default WordRevealEffect;
