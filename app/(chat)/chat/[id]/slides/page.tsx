"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { segmentDocument } from "@/lib/utils";
import WordRevealEffect from "@/components/word-reveal";


export default function Flashcards() {
  const searchParams = useSearchParams();
  const content = searchParams.get("content");
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (content) {
      const parsedParagraphs = segmentDocument(decodeURIComponent(content));
  
      // Filter out paragraphs that start with `#`, `##`, `###` - essentially filtering out titles
      const filteredParagraphs = parsedParagraphs.filter(
        (paragraph) => !paragraph.trim().startsWith("#")
      );
  
      setParagraphs(filteredParagraphs);
    }
  }, [content]);
  

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => { 
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, paragraphs.length - 1)
    );
  };


  // TEMP var assignments  -- will later be dynamically passed from instrument panel
  let bgColor = "bg-gradient-to-br from-slate-700 via-zinc-700 to-slate-800"
  let highlightColor = "text-yellow-400"
  let textColor = "text-white"
  let speed = 200
  // const [bgColor, setBgColor] = useState("emerald-950");

  return (
    <div className="flex flex-col items-center h-screen w-full">
      {paragraphs.length > 0 ? (
        <div className="space-y-4 w-full md:w-3/5 lg:w-1/3 mt-[10%]">
          {/* card */}
          <div className={`p-6 sm:p-20 ${bgColor} ${textColor} rounded shadow-xl text-left`}>
            <WordRevealEffect text={paragraphs[currentIndex]} highlightColor={highlightColor} speed={speed}/>
          </div>
        

          {/* buttons */}
          <div className="flex justify-between gap-4 fixed bottom-10">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`px-4 py-2 rounded ${
                currentIndex === 0
                  ? "bg-zinc-300 cursor-not-allowed"
                  : "bg-zinc-600 text-white hover:bg-zinc-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === paragraphs.length - 1}
              className={`px-4 py-2 rounded ${
                currentIndex === paragraphs.length - 1
                  ? "bg-zinc-300 cursor-not-allowed"
                  : "bg-zinc-600 text-white hover:bg-zinc-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>Loading content...</p>
      )}
    </div>
  );
}
