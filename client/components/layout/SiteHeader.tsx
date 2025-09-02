import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const ids = ["home", "about", "projects", "skills", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const linkBase =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors text-muted-foreground hover:text-foreground";

  const linkClass = (id: string) =>
    `${linkBase} ${active === id ? "text-brand" : ""}`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F7c2c842d462c4980be025beefe58c5ff%2F0f9e777d345b4c1fb0d55a0a66c6c64c?format=webp&width=200"
            alt="Abhijeet Mishra"
            className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10"
          />
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            <span className="bg-gradient-to-r from-brand to-brand-2 bg-clip-text text-transparent">Abhijeet</span>
            <span className="text-foreground"> Mishra</span>
          </span>
        </a>

        <nav className="hidden gap-1 md:flex">
          <a href="#home" className={linkClass("home")}>Home</a>
          <a href="#about" className={linkClass("about")}>About</a>
          <a href="#projects" className={linkClass("projects")}>Projects</a>
          <a href="#skills" className={linkClass("skills")}>Skills</a>
          <a href="#contact" className={linkClass("contact")}>Contact</a>
        </nav>

        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-foreground"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10">
          <div className="container py-3 flex flex-col gap-1">
            <a href="#home" className={linkClass("home")} onClick={() => setOpen(false)}>Home</a>
            <a href="#about" className={linkClass("about")} onClick={() => setOpen(false)}>About</a>
            <a href="#projects" className={linkClass("projects")} onClick={() => setOpen(false)}>Projects</a>
            <a href="#skills" className={linkClass("skills")} onClick={() => setOpen(false)}>Skills</a>
            <a href="#contact" className={linkClass("contact")} onClick={() => setOpen(false)}>Contact</a>
          </div>
        </div>
      )}
    </header>
  );
}
