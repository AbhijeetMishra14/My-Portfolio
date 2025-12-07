import { useEffect, useRef } from "react";

export function useSkillOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const skills = Array.from(
      container.querySelectorAll<HTMLElement>("[data-skill]")
    );

    if (skills.length === 0) return;

    const updatePositions = () => {
      const centerX = container.clientWidth / 2;
      const centerY = container.clientHeight / 2;
      const radius = Math.min(centerX, centerY) * 0.6;

      skills.forEach((skill, i) => {
        const angle = (i / skills.length) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        skill.style.setProperty(
          "--orbit-x",
          `${x - skill.clientWidth / 2}px`
        );
        skill.style.setProperty(
          "--orbit-y",
          `${y - skill.clientHeight / 2}px`
        );
      });
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);

    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  return containerRef;
}
