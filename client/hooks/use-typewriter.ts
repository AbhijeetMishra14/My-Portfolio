import { useState, useEffect, useRef, useCallback } from "react";

export function useTypewriter(texts: string[], speed: number = 120, deleteSpeed: number = 80) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const charIndexRef = useRef(0);
  const isMountedRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    charIndexRef.current = 0;
    const currentText = texts[currentIndex];

    const typeCharacter = () => {
      if (!isMountedRef.current) return;

      if (charIndexRef.current < currentText.length) {
        setDisplayedText(currentText.substring(0, charIndexRef.current + 1));
        charIndexRef.current++;
        timeoutRef.current = setTimeout(typeCharacter, speed);
      } else {
        // Wait before deleting
        timeoutRef.current = setTimeout(() => {
          deleteCharacter();
        }, 2000);
      }
    };

    const deleteCharacter = () => {
      if (!isMountedRef.current) return;

      if (charIndexRef.current > 0) {
        charIndexRef.current--;
        setDisplayedText(currentText.substring(0, charIndexRef.current));
        timeoutRef.current = setTimeout(deleteCharacter, deleteSpeed);
      } else {
        // Move to next text
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    };

    timeoutRef.current = setTimeout(typeCharacter, speed);

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, texts, speed, deleteSpeed]);

  return displayedText;
}
