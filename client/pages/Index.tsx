import { useReveal } from "../hooks/use-reveal";
import { Github, Instagram, Phone, Star, Mail, Code2, Cpu, Gamepad2, Smartphone, Layers, Download, Zap, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Globe, Brain, Shield, Lock, Terminal } from "lucide-react";


export default function Index() {
  useReveal();

  const GH_USER = "AbhijeetMishra14";
  type Repo = {
    id: number; name: string; description: string | null; html_url: string; language: string | null; stargazers_count: number; fork: boolean; pushed_at: string; homepage: string | null; has_pages?: boolean;
  };

  const { data, isLoading, error } = useQuery<Repo[]>({
    queryKey: ["gh-repos"],
    queryFn: async () => {
      const per_page = 100;
      let page = 1;
      const all: Repo[] = [];
      while (true) {
        const res = await fetch(`https://api.github.com/users/AbhijeetMishra14/repos?per_page=${per_page}&page=${page}&type=all&sort=updated`, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const batch = (await res.json()) as Repo[];
        all.push(...batch);
        if (batch.length < per_page) break;
        page++;
        if (page > 10) break;
      }
      return all;
    },
    staleTime: 1000 * 60 * 5,
  });

  const repos = useMemo(() => {
    const list = data ?? [];
    const unique = Array.from(new Map(list.map(r => [r.id, r])).values());
    const dedup: Repo[] = [];
    const seen = new Set<string>();
    for (const r of unique) {
      const n = r.name.toLowerCase();
      const key = n.includes("nivaashub") ? "nivaashub" : n;
      if (seen.has(key)) continue;
      seen.add(key);
      dedup.push(r);
    }
    return dedup
      .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()));
  }, [data]);

  const [showAllRepos, setShowAllRepos] = useState(false);

  const getDesc = (repo: Repo) => {
    const name = repo.name.toLowerCase();
    if (name.includes("nivaashub")) {
      return "Nepal’s first online room‑rental platform connecting renters with verified brokers, transparent pricing, and excellent service. Search, compare, and move in—hassle‑free.";
    }
    if (name.includes("arya")) {
      return "Voice‑controlled desktop AI assistant that can operate your PC end‑to‑end: launch apps, browse, type, manage files, and even install or uninstall programs securely.";
    }
    if (repo.description && repo.description.trim().length > 0) return repo.description;
    const pretty = repo.name
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const lang = repo.language ?? "multiple technologies";
    return `${pretty} built with ${lang}. Clean, modern code with a focus on performance and DX.`;
  };

  const overrides: Record<string, { name?: string; image?: string; live?: string }> = {
    arya: { name: "Jarvis", image: "https://www.nibib.nih.gov/sites/default/files/inline-images/AI%20600%20x%20400.jpg" },
    nivaashub: { image: "https://cdn.builder.io/api/v1/image/assets%2F7c2c842d462c4980be025beefe58c5ff%2F079fa205f74f42039f067dc5107a97e5?format=webp&width=800" },
    aafnoshop: { image: "https://cdn.builder.io/api/v1/image/assets%2F7c2c842d462c4980be025beefe58c5ff%2F688c303bbe9745c3b228e76bc796ea78?format=webp&width=800" },
    "roshni-portfolio": { live: "https://roshnimishra.com.np/" },
    roshni: { live: "https://roshnimishra.com.np/" },
  };
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section id="home" className="scroll-mt-24 relative overflow-hidden rounded-2xl border border-white/10 bg-card/40 p-8 md:p-12" data-reveal>
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-80 w-80 rounded-full bg-brand-2/30 blur-3xl" />
        <div className="mx-auto max-w-3xl text-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F7c2c842d462c4980be025beefe58c5ff%2F4176a71974824ceda78cb3807045ae98?format=webp&width=800"
            alt="Abhijeet Mishra"
            className="mx-auto h-44 w-44 rounded-2xl object-cover border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] ring-2 ring-brand/50"
            data-reveal
          />
          <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-6xl" data-reveal>
            <span className="bg-gradient-to-r from-brand via-white to-brand-2 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-x">Abhijeet Mishra</span>
          </h1>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24" data-reveal>
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 h-px w-24 bg-gradient-to-r from-brand via-white/60 to-brand-2 shadow-[0_0_30px_hsl(var(--brand)/0.7)]" />
          <h2 className="text-2xl font-extrabold tracking-tight">About</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            MERN developer with <span className="font-semibold text-foreground">5+ years</span> experience. Freelance on <span className="font-semibold text-foreground">Upwork</span>. Built projects like
            <span className="font-semibold text-foreground"> Jarvis</span> (AI assistant), <span className="font-semibold text-foreground">Nivaashub</span> (room rental platform), and <span className="font-semibold text-foreground">AafnoShop</span> (e-commerce).
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* What I Do */}
          <div className="rounded-xl border border-white/10 bg-card/40 p-5">
            <h3 className="font-semibold">What I Do</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>End‑to‑end apps with <span className="font-semibold text-foreground">MongoDB, Express, React, Node</span></li>
              <li>AI assistants & automation pipelines (<span className="font-semibold text-foreground">Jarvis</span>)</li>
              <li>Product engineering: auth, APIs, payments, deployments</li>
            </ul>
          </div>

          {/* Skills & Expertise */}
          <div className="rounded-xl border border-white/10 bg-card/40 p-5">
            <h3 className="font-semibold">Skills & Expertise</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><span className="font-semibold text-foreground">Frontend:</span> React, Next.js, Tailwind CSS, TypeScript</li>
              <li><span className="font-semibold text-foreground">Backend:</span> Node.js, Express, MongoDB, REST & GraphQL APIs</li>
              <li><span className="font-semibold text-foreground">Tools & Deployment:</span> Git, Docker, Vercel, Netlify</li>
              <li><span className="font-semibold text-foreground">AI & Automation:</span> OpenAI GPT, Chatbots, Automation Pipelines</li>
            </ul>
          </div>

          {/* Projects */}
          <div className="rounded-xl border border-white/10 bg-card/40 p-5">
            <h3 className="font-semibold">Projects</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="font-semibold text-foreground">Jarvis:</span> AI assistant with natural language understanding and automation capabilities.
              </li>
              <li>
                <span className="font-semibold text-foreground">Nivaashub:</span> Room rental platform with booking, payments, and user management.
              </li>
              <li>
                <span className="font-semibold text-foreground">AafnoShop:</span> E-commerce platform with product listings, cart, and payment integration.
              </li>
              <li>
                <span className="font-semibold text-foreground">Portfolio Website:</span> Personal website showcasing projects, skills, and blog posts.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section id="qualifications" className="scroll-mt-24" data-reveal>
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 h-px w-24 bg-gradient-to-r from-brand via-white/60 to-brand-2 shadow-[0_0_30px_hsl(var(--brand)/0.7)]" />
          <h2 className="text-2xl font-extrabold tracking-tight">Qualifications</h2>
          <p className="mt-2 text-sm text-muted-foreground">SEE subject grades and education snapshot.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-card/40 p-5">
            <h3 className="font-semibold">Education</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>SEE (10th): <span className="font-semibold text-foreground">Shree Rajdevi Secondary School</span> — <span className="rounded-full bg-gradient-to-r from-brand to-brand-2 px-2 py-0.5 text-xs font-semibold text-white">GPA 3.80</span></li>
              <li>Currently pursuing <span className="font-semibold text-foreground">+2</span> at <span className="font-semibold text-foreground">KMC</span>, Bagbazar</li>
              <li>Address: <span className="font-semibold text-foreground">Rajbiraj</span> • Current: <span className="font-semibold text-foreground">Narephat‑32, Kathmandu</span></li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-card/40 p-5">
            <h3 className="font-semibold">Subject Grades</h3>
            <div className="mt-3 space-y-3 text-sm">
              <div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Nepali</span><span className="text-xs text-muted-foreground">A</span></div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded bg-white/10"><div className="h-2 w-[90%] animate-gradient-x rounded bg-gradient-to-r from-brand via-white/70 to-brand-2" /></div>
              </div>
              <div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Social</span><span className="text-xs text-muted-foreground">B+</span></div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded bg-white/10"><div className="h-2 w-[82%] animate-gradient-x rounded bg-gradient-to-r from-brand via-white/70 to-brand-2" /></div>
              </div>
              <div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">English</span><span className="text-xs text-muted-foreground">A+</span></div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded bg-white/10"><div className="h-2 w-[96%] animate-gradient-x rounded bg-gradient-to-r from-brand via-white/70 to-brand-2" /></div>
              </div>
              <div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Mathematics</span><span className="text-xs text-muted-foreground">A+</span></div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded bg-white/10"><div className="h-2 w-[96%] animate-gradient-x rounded bg-gradient-to-r from-brand via-white/70 to-brand-2" /></div>
              </div>
              <div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Opt. Math</span><span className="text-xs text-muted-foreground">A+</span></div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded bg-white/10"><div className="h-2 w-[96%] animate-gradient-x rounded bg-gradient-to-r from-brand via-white/70 to-brand-2" /></div>
              </div>
              <div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Science</span><span className="text-xs text-muted-foreground">A+</span></div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded bg-white/10"><div className="h-2 w-[96%] animate-gradient-x rounded bg-gradient-to-r from-brand via-white/70 to-brand-2" /></div>
              </div>
              <div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Computer</span><span className="text-xs text-muted-foreground">A+</span></div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded bg-white/10"><div className="h-2 w-[96%] animate-gradient-x rounded bg-gradient-to-r from-brand via-white/70 to-brand-2" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="hidden" data-reveal>
        {[
          {
            title: "Hands-on Electronics",
            desc: "From Arduino to ESP32 — real circuits, sensors, and systems.",
          },
          {
            title: "Modern Web Dev",
            desc: "React + TypeScript, clean APIs, auth, and deployment.",
          },
          {
            title: "Clear Tutorials",
            desc: "Step‑by‑step guides with code, diagrams, and pro tips.",
          },
        ].map((item, i) => (
          <div
            key={item.title}
            className="rounded-xl border border-white/10 bg-card/40 p-6 transition hover:border-brand motion-safe:animate-float"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <div className="h-10 w-10 rounded-md bg-gradient-to-br from-brand to-brand-2 shadow-[0_0_12px_hsl(var(--brand))]"></div>
            <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">{item.desc.split(" — ")[0]}</span>{item.desc.includes(" — ") ? ` — ${item.desc.split(" — ")[1]}` : ""}</p>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section id="projects" className="scroll-mt-24" data-reveal>
        <div className="mb-6 text-center">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight">Projects</h2>
            <p className="text-sm text-muted-foreground">Live from GitHub.</p>
          </div>
          <a href="https://github.com/AbhijeetMishra14" target="_blank" rel="noreferrer" className="text-sm font-semibold text-brand hover:opacity-90">View GitHub</a>
        </div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl border border-white/10 bg-card/40 p-5">
                <div className="aspect-video rounded-md bg-white/5" />
                <div className="mt-4 h-4 w-1/2 rounded bg-white/10" />
                <div className="mt-2 h-3 w-3/4 rounded bg-white/10" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-md border border-white/10 bg-card/40 p-4 text-sm text-muted-foreground">
            Unable to load repositories from GitHub right now. Please try again later.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(showAllRepos ? repos : repos.slice(0, 3)).map((repo) => {
              const key = repo.name.toLowerCase();
              const override = overrides[key] || {};
              const displayName = (override as any).name ?? repo.name;
              const img = (override as any).image as string | undefined;
              const homepage = (repo as any).homepage && String((repo as any).homepage).trim() ? String((repo as any).homepage).trim() : undefined;
              const pagesUrl = !homepage && (repo as any).has_pages ? `https://${GH_USER}.github.io/${repo.name}/` : undefined;
              const live = (override as any).live ?? homepage ?? pagesUrl;
              return (
                <article key={repo.id} className="group relative overflow-hidden rounded-xl border border-white/10 bg-card/40 transition-transform duration-300 hover:-translate-y-1">
                  {(() => {
                    const og = `https://opengraph.githubassets.com/1/${GH_USER}/${repo.name}`;
                    const liveImg = live ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(live)}?w=1200` : undefined;
                    const isPortfolio = /portfolio/i.test(repo.name);
                    const localShot = typeof window !== "undefined" && isPortfolio ? `https://s.wordpress.com/mshots/v1/${encodeURIComponent(window.location.origin)}?w=1200` : undefined;
                    const cover = localShot || liveImg || img || og;
                    return (
                      <img src={cover} alt={`${displayName} live preview`} className="aspect-video w-full object-cover" loading="lazy" />
                    );
                  })()}
                  <div className="p-5">
                    <h3 className="font-semibold">{displayName}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{getDesc(repo)}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5" /> {repo.stargazers_count}</span>
                      <span>{repo.language ?? ""}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      {live && (
                        <a href={live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold hover:border-brand">
                          Live <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <a href={repo.html_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold hover:border-brand">
                        GitHub
                      </a>
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ boxShadow: "inset 0 0 0 1px hsl(var(--brand))" }} />
                </article>
              );
            })}
            {repos.length > 3 && (
              <div className="sm:col-span-2 lg:col-span-3 flex justify-center">
                <button onClick={() => setShowAllRepos(v => !v)} className="mt-2 inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-semibold hover:border-brand">
                  {showAllRepos ? "Show less" : "Show more"}
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Skills */}
      <section id="skills" className="scroll-mt-24" data-reveal>
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 h-px w-24 bg-gradient-to-r from-brand via-white/60 to-brand-2 shadow-[0_0_30px_hsl(var(--brand)/0.7)]" />
          <h2 className="text-2xl font-extrabold tracking-tight">Skills</h2>
          <p className="text-sm text-muted-foreground">Tools and platforms I use to build real products.</p>
        </div>

        <div className="space-y-10">
          {/* Web Development */}
          <div>
            <h3 className="mb-4 text-xl font-bold tracking-tight">🌐 Web Development</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[{
                icon: Globe,
                title: "MERN Stack",
                desc: "Production-ready apps with MongoDB, Express, React, and Node. Built Aafnoshop and Nivaashub with clean APIs, auth, and UX.",
              }, {
                icon: Code2,
                title: "Frontend",
                desc: "Strong in HTML, CSS, JavaScript, React, TailwindCSS, responsive UI, animations, and modern design systems.",
              }, {
                icon: Code2,
                title: "Backend",
                desc: "Built REST/GraphQL APIs with Node, Express, and MongoDB. Authentication, file storage, and deployment with Docker/Nginx.",
              }].map((s, i) => (
                <article key={`web-${i}`} className="rounded-xl border border-white/10 bg-card/40 p-5 transition hover:border-brand">
                  <div className="flex items-center gap-3">
                    <s.icon className="h-5 w-5 text-brand" />
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>

          {/* App Development */}
          <div>
            <h3 className="mb-4 text-xl font-bold tracking-tight">📱 App Development</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[{
                icon: Smartphone,
                title: "Flutter",
                desc: "Cross-platform apps with smooth animations, REST/GraphQL, state management, and native integrations.",
              }, {
                icon: Smartphone,
                title: "React Native",
                desc: "High-quality native experiences: fast lists, offline-first, production builds for iOS/Android.",
              }, {
                icon: Gamepad2,
                title: "Unity / C#",
                desc: "Game development: physics, gameplay systems, input, and tooling with a focus on iteration speed.",
              }].map((s, i) => (
                <article key={`app-${i}`} className="rounded-xl border border-white/10 bg-card/40 p-5 transition hover:border-brand">
                  <div className="flex items-center gap-3">
                    <s.icon className="h-5 w-5 text-brand" />
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>

          {/* AI & ML */}
          <div>
            <h3 className="mb-4 text-xl font-bold tracking-tight">🧠 AI & Machine Learning</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[{
                icon: Brain,
                title: "AI / ML",
                desc: "Experience with TensorFlow, PyTorch, OpenCV, Hugging Face, LangChain, Whisper AI, Vosk, DeepFace.",
              }, {
                icon: Cpu,
                title: "AI Projects",
                desc: "Built Jarvis: a desktop voice assistant that launches apps, types, browses, manages files, and installs/uninstalls securely.",
              }, {
                icon: Brain,
                title: "Emerging AI Tools",
                desc: "Worked with Google Gemini, Perplexity, YOLOv8, Edge Impulse, Teachable Machine for CV, NLP, and voice recognition.",
              }].map((s, i) => (
                <article key={`ai-${i}`} className="rounded-xl border border-white/10 bg-card/40 p-5 transition hover:border-brand">
                  <div className="flex items-center gap-3">
                    <s.icon className="h-5 w-5 text-brand" />
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>

          {/* IoT & Hardware */}
          <div>
            <h3 className="mb-4 text-xl font-bold tracking-tight">🔧 IoT & Hardware</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[{
                icon: Layers,
                title: "IoT Boards",
                desc: "Arduino Uno/Mega, ESP32, ESP8266, NodeMCU, Raspberry Pi for robotics and embedded projects.",
              }, {
                icon: Layers,
                title: "Sensors & Modules",
                desc: "Worked with Ultrasonic, PIR, GPS, Accelerometer, Load Cell, RTC, GSM, Bluetooth, WiFi, CAN Bus, LDR, and Gas sensors.",
              }, {
                icon: Layers,
                title: "Embedded Systems",
                desc: "Data logging, automation, and IoT dashboards. Experience integrating hardware with cloud APIs.",
              }].map((s, i) => (
                <article key={`iot-${i}`} className="rounded-xl border border-white/10 bg-card/40 p-5 transition hover:border-brand">
                  <div className="flex items-center gap-3">
                    <s.icon className="h-5 w-5 text-brand" />
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Cybersecurity */}
          <div>
            <h3 className="mb-4 text-xl font-bold tracking-tight">🔒 Cybersecurity</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[{
                icon: Shield,
                title: "Pentesting",
                desc: "2+ years with Kali Linux, penetration testing, vulnerability analysis, exploit simulations.",
              }, {
                icon: Lock,
                title: "Security Tools",
                desc: "Hands-on with Wireshark, Burp Suite, Metasploit, Aircrack-ng, Hashcat, John the Ripper, Rubber Ducky.",
              }, {
                icon: Terminal,
                title: "Red Team / Hacking",
                desc: "Ethical hacking, password attacks, social engineering, exploit development, and network security testing.",
              }].map((s, i) => (
                <article key={`cyber-${i}`} className="rounded-xl border border-white/10 bg-card/40 p-5 transition hover:border-brand">
                  <div className="flex items-center gap-3">
                    <s.icon className="h-5 w-5 text-brand" />
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24" data-reveal>
        <div className="max-w-2xl mx-auto text-center">
          <header className="mb-6">
            <h2 className="text-2xl font-extrabold tracking-tight">Let’s Connect</h2>
            <p className="mt-2 text-muted-foreground">I’m Abhijeet Mishra — a MERN stack developer building products end‑to‑end (MongoDB, Express, React, Node) with a passion for AI and automation. Let’s ship real, useful software.</p>
          </header>
          <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
            <li>Phone: <a className="text-foreground hover:underline" href="tel:+9779821765304">+977 9821765304</a></li>
            <li>Email: <a className="text-foreground hover:underline" href="mailto:abhijeetmishralyff@gmail.com">abhijeetmishralyff@gmail.com</a></li>
          </ul>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <a href="mailto:abhijeetmishralyff@gmail.com" className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-semibold hover:border-brand">Get In Touch</a>
            <a href="#skills" className="inline-flex items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-semibold hover:border-brand">View My Skills</a>
            <a href="https://cdn.builder.io/o/assets%2F7c2c842d462c4980be025beefe58c5ff%2Fe92a1e83c810465cab7abd5385dac57a?alt=media&token=90ad03d0-6fd1-45b4-b58f-1af7851154df&apiKey=7c2c842d462c4980be025beefe58c5ff" download className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-brand to-brand-2 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_hsl(var(--brand)/0.4)]">Download CV</a>
          </div>
        </div>
      </section>
    </div>
  );
}
