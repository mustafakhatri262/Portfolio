import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Code2 } from "lucide-react";
import profilePhoto from "../../neww.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = ["Work", "About", "Skills", "Leadership", "Contact"];

const NAME = "Muhammad Mustafa";
const TITLE = "Software Engineer | AI/ML Engineer | Web Developer";
const EMAIL = "work.mustafa262@gmail.com";
const PHONE = "+92 316 3990033";
const LOCATION = "Karachi, Pakistan";
const LINKEDIN = "https://linkedin.com/in/muhammad-mustafa-83b436383";
const RESUME = "/Muhammad_Mustafa_CV_U.pdf";

const PROJECTS = [
  {
    id: 1,
    title: "Algo Rank",
    category: "Competitive Programming Platform",
    year: "2025",
    description:
      "A real-time coding competition platform with dynamic leaderboards, live scoring, JWT authentication, and concurrent session management.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop&auto=format",
    tags: ["React.js", "Node.js", "Express.js", "PostgreSQL"],
    accent: "#C8FF00",
    index: "01",
  },
  {
    id: 2,
    title: "Karachi Market Intelligent Path Finder",
    category: "AI Navigation System",
    year: "2025",
    description:
      "An AI-based navigation system using A* and Uniform Cost Search on real geographical data, with live map API integration through Streamlit.",
    image:
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop&auto=format",
    tags: ["Python", "Streamlit", "A* Search", "UCS"],
    accent: "#FF6B35",
    index: "02",
  },
  {
    id: 3,
    title: "Air Ticket Reservation System",
    category: "Full-Stack Booking Platform",
    year: "2024",
    description:
      "A flight booking experience with real-time seat availability, search filters, payment flow, and a normalized Oracle SQL backend.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop&auto=format",
    tags: ["React.js", "Node.js", "Express.js", "Oracle SQL"],
    accent: "#A78BFA",
    index: "03",
  },
];

const SKILLS = [
  { name: "React.js / TypeScript", level: 95 },
  { name: "Node.js / Express.js", level: 90 },
  { name: "Python / Machine Learning", level: 88 },
  { name: "PostgreSQL / MongoDB", level: 84 },
  { name: "REST APIs / Streamlit", level: 80 },
  { name: "C / C++ / Data Structures", level: 86 },
];

const TOOLS = ["Git", "GitHub", "VS Code", "Figma", "Linear", "Notion", "Agile", "Scikit-learn"];

const HIGHLIGHTS = [
  { num: "5", label: "Technical projects" },
  { num: "3", label: "Leadership roles" },
  { num: "4+", label: "Awards & certs" },
];

const CODE_LINES = [
  "const name = 'Muhammad Mustafa';",
  "const stack = ['React', 'TypeScript', 'Node'];",
  "const focus = ['AI/ML', 'Web', 'APIs'];",
  "function buildPortfolio() {",
  "  return 'code meets intelligence';",
  "}",
  "while (true) { learn(); build(); ship(); }",
  "git add . && git commit -m 'ship';",
  "fast-NUCES -> Procom -> ACM",
];

const LEADERSHIP_ITEMS = [
  {
    title: "Co-Head, Extended Procom (Media Production)",
    meta: "FAST-NUCES | 2025 - 2026",
    description:
      "Led a 10+ member team in multimedia content creation and supervised design, animation, and video production for a national-level event.",
  },
  {
    title: "Deputy Organizer, AI Competitions (Vibe Coding)",
    meta: "Procom | 2026",
    description:
      "Organized AI-focused coding competitions for 200+ participants and managed logistics, problem design, judging criteria, and coordination.",
  },
  {
    title: "Coordinator, ACM Animation Team",
    meta: "ACM FAST Chapter | 2024 - 2025",
    description:
      "Produced and edited 15+ promotional videos for university events, workshops, and campaigns under tight deadlines.",
  },
];

const ACHIEVEMENTS = [
  "Star Performer Award - ACM FAST Chapter (Technical Contribution & Leadership)",
  "Shields Award - Procom FAST (Event Management & Team Coordination)",
  "Star Performer Award - Procom FAST (Leadership & Technical Excellence)",
  "Multiple Competition Certificates - Procom, DevDay, Coders Cup (2024-2026)",
];

const RELEVANT_DETAILS = [
  { label: "Education", value: "BS Computer Science, FAST-NUCES Karachi" },
  { label: "Experience", value: "Teaching Assistant at FAST-NUCES" },
  { label: "Languages", value: "English (Fluent), Urdu (Native)" },
  { label: "Email", value: EMAIL },
  { label: "Phone", value: PHONE },
];

// ─── Animated Text ───────────────────────────────────────────────────────────

function TypingText({
  text,
  className = "",
  delay = 0,
  speed = 45,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [visibleCount, setVisibleCount] = useState(0);
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    setVisibleCount(0);
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      let index = 0;
      intervalRef.current = window.setInterval(() => {
        index += 1;
        setVisibleCount(index);

        if (index >= text.length) {
          if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, speed);
    }, delay * 1000);

    return () => window.clearTimeout(startTimer);
  }, [delay, inView, speed, text]);

  return (
    <span ref={ref} className={`inline-flex items-center whitespace-pre ${className}`}>
      <span>{text.slice(0, visibleCount)}</span>
      <span className={`ml-1 inline-block text-accent animate-pulse ${visibleCount >= text.length ? "opacity-0" : "opacity-100"}`}>
        ▍
      </span>
    </span>
  );
}

function CodeBackdrop() {
  const columns = [
    CODE_LINES,
    [...CODE_LINES.slice(3), ...CODE_LINES.slice(0, 3)],
    [...CODE_LINES.slice(5), ...CODE_LINES.slice(0, 5)],
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-[#050505]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,255,0,0.08),transparent_42%)]" />
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12 py-28 opacity-40">
        {columns.map((lines, columnIndex) => (
          <div key={columnIndex} className="relative overflow-hidden h-full">
            <motion.div
              className="flex flex-col gap-3"
              animate={{ y: [0, -50 + "%"] }}
              transition={{ duration: 24 + columnIndex * 5, repeat: Infinity, ease: "linear" }}
            >
              {[...lines, ...lines].map((line, lineIndex) => (
                <div
                  key={`${columnIndex}-${lineIndex}`}
                  className="rounded-xl border border-border/30 bg-card/20 px-4 py-3 backdrop-blur-[1px]"
                >
                  <span className="font-['Geist_Mono'] text-[10px] md:text-xs leading-5 text-accent/70">
                    {line}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
    </div>
  );
}

// ─── Reveal Wrapper ───────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "bg-[#080808]/90 backdrop-blur-md border-b border-border" : ""
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-accent transition-colors hover:border-accent hover:bg-accent/10"
          data-magnetic
          aria-label="Scroll to top"
        >
          <Code2 className="h-5 w-5" strokeWidth={2.25} />
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <button
                onClick={() => scrollTo(item)}
                className="font-['Outfit'] text-sm text-muted-foreground hover:text-foreground transition-colors tracking-wide"
                data-magnetic
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${EMAIL}`}
          className="hidden md:inline-flex items-center gap-2 font-['Geist_Mono'] text-xs text-accent border border-accent/30 px-4 py-2 hover:bg-accent hover:text-[#080808] transition-all duration-300"
          data-magnetic
        >
          HIRE ME
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-foreground origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-px bg-foreground"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-px bg-foreground origin-center"
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#080808] flex flex-col items-center justify-center gap-10"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(item)}
                className="font-['Unbounded'] text-4xl font-bold text-foreground hover:text-accent transition-colors"
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"], layoutEffect: false });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-end pb-20 px-6 md:px-12 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(242,242,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,242,238,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <CodeBackdrop />

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="block w-12 h-px bg-accent" />
          <span className="font-['Geist_Mono'] text-xs text-accent tracking-[0.25em] uppercase">
            {TITLE}
          </span>
        </motion.div>

        {/* Main headline */}
        <h1 className="font-['Unbounded'] font-black leading-[0.95] tracking-tight overflow-hidden">
          <div className="whitespace-nowrap text-[clamp(2.6rem,8vw,8.6rem)] text-foreground">
            <TypingText text="MUHAMMAD" delay={0.45} speed={58} />
          </div>
          <div className="whitespace-nowrap text-[clamp(2.6rem,8vw,8.6rem)] text-foreground -mt-2">
            <TypingText text="MUSTAFA" delay={1.35} speed={58} className="text-accent" />
          </div>
        </h1>

        {/* Sub row */}
        <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal delay={1.1} className="max-w-sm">
            <p className="font-['Outfit'] text-base text-muted-foreground leading-relaxed">
              I build digital experiences where software engineering, AI/ML, and full-stack development intersect. Currently focused on scalable, real-world products.
            </p>
          </Reveal>

          <Reveal delay={1.3}>
            <div className="flex items-center gap-4">
              <button
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                className="font-['Unbounded'] text-xs font-bold text-[#080808] bg-accent px-6 py-3 hover:bg-foreground transition-colors tracking-wider"
                data-magnetic
              >
                VIEW WORK
              </button>
              <button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="font-['Unbounded'] text-xs font-bold text-foreground border border-border px-6 py-3 hover:border-accent hover:text-accent transition-colors tracking-wider"
                data-magnetic
              >
                CONTACT
              </button>
            </div>
          </Reveal>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-12 flex flex-col items-center gap-2"
      >
        <span className="font-['Geist_Mono'] text-[10px] text-muted-foreground tracking-[0.2em] rotate-90 origin-center">
          SCROLL
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section id="about" className="py-32 px-6 md:px-12" ref={ref}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden aspect-[3/4] bg-muted">
            <img
              src={profilePhoto}
              alt={NAME}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent" />
          </div>
          {/* Floating stat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-6 -right-6 bg-accent text-[#080808] p-6"
          >
            <span className="block font-['Unbounded'] text-4xl font-black">5+</span>
              <span className="block font-['Outfit'] text-xs font-semibold tracking-wide mt-1">
              PROJECTS
            </span>
          </motion.div>
        </motion.div>

        {/* Text column */}
        <div>
          <Reveal>
            <span className="font-['Geist_Mono'] text-xs text-accent tracking-[0.25em] uppercase">
              About
            </span>
          </Reveal>

          <div className="mt-4 overflow-hidden">
            <motion.h2
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-['Unbounded'] text-4xl md:text-5xl font-black text-foreground leading-tight"
            >
              <TypingText text="Code meets" delay={0.2} speed={55} />
              <br />
              <TypingText text="intelligence." delay={0.95} speed={55} className="text-accent" />
            </motion.h2>
          </div>

          <Reveal delay={0.2} className="mt-6">
            <p className="font-['Outfit'] text-base text-muted-foreground leading-relaxed">
              I'm a BS Computer Science student at FAST-NUCES, {LOCATION}, with a CGPA of 3.05/4.0. My focus is software engineering, artificial intelligence, machine learning, and full-stack web development.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-4">
            <p className="font-['Outfit'] text-base text-muted-foreground leading-relaxed">
              I have practical experience building REST APIs, designing scalable applications, and applying data structures and algorithms. Leadership roles through ACM and Procom strengthened my collaboration and delivery skills. You can reach me at {PHONE}.
            </p>
          </Reveal>

          <Reveal delay={0.4} className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {HIGHLIGHTS.map(({ num, label }) => (
              <div key={label}>
                <span className="font-['Unbounded'] text-3xl font-black text-foreground">{num}</span>
                <span className="block font-['Outfit'] text-xs text-muted-foreground mt-1">{label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({ project, i }: { project: (typeof PROJECTS)[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-card border border-border overflow-hidden cursor-pointer"
      data-magnetic
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video bg-muted">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${project.accent}22 0%, transparent 60%)` }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-['Geist_Mono'] text-xs text-muted-foreground tracking-widest">
              {project.index} — {project.category}
            </span>
            <h3
              className="font-['Unbounded'] text-2xl md:text-3xl font-black text-foreground mt-1 leading-tight"
              style={{ color: hovered ? project.accent : undefined, transition: "color 0.3s" }}
            >
              {project.title}
            </h3>
          </div>
          <motion.span
            animate={{ opacity: hovered ? 1 : 0.3, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.3 }}
            className="font-['Geist_Mono'] text-xs text-muted-foreground mt-1 shrink-0"
          >
            {project.year} →
          </motion.span>
        </div>

        <p className="font-['Outfit'] text-sm text-muted-foreground leading-relaxed mt-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-['Geist_Mono'] text-[10px] tracking-widest text-muted-foreground border border-border px-2.5 py-1 uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Work Section ─────────────────────────────────────────────────────────────

function Work() {
  return (
    <section id="work" className="py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <Reveal>
              <span className="font-['Geist_Mono'] text-xs text-accent tracking-[0.25em] uppercase">
                Selected Work
              </span>
            </Reveal>
            <div className="overflow-hidden mt-2">
              <Reveal>
                <h2 className="font-['Unbounded'] text-5xl md:text-7xl font-black text-foreground leading-none">
                  <TypingText text="Projects" delay={0.15} speed={58} />
                </h2>
              </Reveal>
            </div>
          </div>
          <Reveal>
            <span className="font-['Geist_Mono'] text-xs text-muted-foreground hidden md:block">
              {PROJECTS.length} PROJECTS
            </span>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <div key={project.id} className={i === 0 ? "md:col-span-2" : ""}>
              <ProjectCard project={project} i={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section id="skills" className="py-32 px-6 md:px-12 bg-card border-y border-border" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <Reveal>
              <span className="font-['Geist_Mono'] text-xs text-accent tracking-[0.25em] uppercase">
                Expertise
              </span>
            </Reveal>
            <div className="overflow-hidden mt-2">
              <Reveal>
                <h2 className="font-['Unbounded'] text-5xl md:text-6xl font-black text-foreground leading-none">
                  <TypingText text="Skills" delay={0.15} speed={58} />
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="mt-6">
              <p className="font-['Outfit'] text-base text-muted-foreground leading-relaxed max-w-xs">
                My stack spans React, TypeScript, Python, Node.js, Express.js, PostgreSQL, MongoDB, and machine learning workflows.
              </p>
            </Reveal>

            {/* Tool tags */}
            <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-2">
              {TOOLS.map((tool) => (
                <span
                  key={tool}
                  className="font-['Geist_Mono'] text-xs text-muted-foreground border border-border px-3 py-1.5"
                >
                  {tool}
                </span>
              ))}
            </Reveal>
          </div>

          <div className="space-y-8">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-['Outfit'] text-sm font-medium text-foreground">{skill.name}</span>
                  <span className="font-['Geist_Mono'] text-xs text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-px bg-muted w-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{
                      duration: 1.2,
                      delay: 0.4 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Leadership & Achievements ──────────────────────────────────────────────

function Leadership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section id="leadership" className="py-32 px-6 md:px-12" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <Reveal>
              <span className="font-['Geist_Mono'] text-xs text-accent tracking-[0.25em] uppercase">
                CV Details
              </span>
            </Reveal>
            <div className="overflow-hidden mt-2">
              <Reveal>
                <h2 className="font-['Unbounded'] text-4xl md:text-6xl font-black text-foreground leading-tight">
                  <TypingText text="Leadership" delay={0.15} speed={45} />
                  <br />
                  <TypingText text="& Achievements" delay={0.65} speed={45} className="text-accent" />
                </h2>
              </Reveal>
            </div>
          </div>
          <Reveal>
            <span className="font-['Geist_Mono'] text-xs text-muted-foreground hidden md:block">
              FAST-NUCES | ACM | PROCOM
            </span>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {LEADERSHIP_ITEMS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.12 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border border-border bg-card p-6"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-['Geist_Mono'] text-[10px] tracking-[0.25em] uppercase text-accent">
                    Role {index + 1}
                  </span>
                  <h3 className="font-['Unbounded'] text-xl md:text-2xl font-black text-foreground leading-tight">
                    {item.title}
                  </h3>
                  <span className="font-['Geist_Mono'] text-xs text-muted-foreground tracking-widest uppercase">
                    {item.meta}
                  </span>
                </div>
                <p className="font-['Outfit'] text-sm text-muted-foreground leading-relaxed mt-4">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="border border-border bg-card p-6"
            >
              <span className="font-['Geist_Mono'] text-xs text-accent tracking-[0.25em] uppercase">
                Achievements
              </span>
              <ul className="mt-5 space-y-3">
                {ACHIEVEMENTS.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 block h-2 w-2 rounded-full bg-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="border border-border bg-card p-6"
            >
              <span className="font-['Geist_Mono'] text-xs text-accent tracking-[0.25em] uppercase">
                Relevant Details
              </span>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RELEVANT_DETAILS.map((detail) => (
                  <div key={detail.label} className="border border-border/70 p-4">
                    <span className="block font-['Geist_Mono'] text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                      {detail.label}
                    </span>
                    <span className="block font-['Outfit'] text-sm text-foreground mt-2 leading-relaxed">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section id="contact" className="py-40 px-6 md:px-12" ref={ref}>
      <div className="max-w-6xl mx-auto text-center">
        <Reveal>
          <span className="font-['Geist_Mono'] text-xs text-accent tracking-[0.25em] uppercase">
            Get in touch
          </span>
        </Reveal>

        {/* Big email CTA */}
        <div className="mt-8 overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Unbounded'] font-black leading-none text-[clamp(2rem,7vw,6rem)] text-foreground"
          >
            <TypingText text="LET'S BUILD" delay={0.2} speed={55} />
            <br />
            <TypingText text="SOMETHING." delay={1.0} speed={55} className="text-accent" />
          </motion.h2>
        </div>

        <Reveal delay={0.3} className="mt-8 max-w-md mx-auto">
          <p className="font-['Outfit'] text-base text-muted-foreground leading-relaxed">
            Whether it's an internship, a product build, or an AI/ML project worth shipping — I'm always open to a serious conversation.
          </p>
        </Reveal>

        <Reveal delay={0.5} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="font-['Unbounded'] text-sm font-bold text-[#080808] bg-accent px-10 py-4 hover:bg-foreground transition-colors tracking-widest w-full sm:w-auto"
            data-magnetic
          >
            EMAIL ME
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="font-['Unbounded'] text-sm font-bold text-foreground border border-border px-10 py-4 hover:border-accent hover:text-accent transition-colors tracking-widest w-full sm:w-auto"
            data-magnetic
          >
            LINKEDIN
          </a>
        </Reveal>

        {/* Availability badge */}
        <Reveal delay={0.7} className="mt-16">
          <div className="inline-flex items-center gap-3 border border-border px-5 py-3">
            <motion.span
              className="block w-2 h-2 rounded-full bg-accent"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span className="font-['Geist_Mono'] text-xs text-muted-foreground tracking-widest uppercase">
              Available for internships, freelance work, and collaborations
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-12 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-['Unbounded'] text-xs font-bold text-muted-foreground">
          MM<span className="text-accent">.</span>
        </span>
        <span className="font-['Geist_Mono'] text-xs text-muted-foreground text-center">
          © 2026 {NAME} — FAST-NUCES, {LOCATION}
        </span>
        <div className="flex gap-6">
          {[
            { label: "Resume", href: RESUME },
            { label: "LinkedIn", href: LINKEDIN },
            { label: "Email", href: `mailto:${EMAIL}` },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-['Geist_Mono'] text-[10px] text-muted-foreground hover:text-accent transition-colors tracking-widest"
            >
              {link.label.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <Nav />
      <Hero />
      <About />
      <Work />
      <Skills />
      <Leadership />
      <Contact />
      <Footer />
    </div>
  );
}
