import { useState, useEffect } from "react";

export default function TypewriterEffect({ text, delay = 20 }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!text) return;

    // Reset when text changes
    setDisplayText("");
    setCurrentIndex(0);
    setIsTyping(true);

    if (currentIndex < text.length && isTyping) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, delay, isTyping, text]);

  return (
    <div className="relative">
      <p>{displayText}</p>
      {currentIndex < text.length && (
        <span className="absolute inline-block ml-1 h-4 w-0.5 bg-blue-600 dark:bg-blue-400 animate-blink"></span>
      )}
    </div>
  );
}
