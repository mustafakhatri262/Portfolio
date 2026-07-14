import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Code2 } from "lucide-react";
import profilePhoto from "../../neww.png";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = ["Work", "About", "Skills", "Contact"];

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

// ─── Cursor Follower ─────────────────────────────────────────────────────────

function CursorFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const raf = useRef<number>(0);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const onHoverIn = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [data-magnetic]")) setIsHovering(true);
    };
    const onHoverOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [data-magnetic]")) setIsHovering(false);
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      current.current.x = lerp(current.current.x, target.current.x, 0.12);
      current.current.y = lerp(current.current.y, target.current.y, 0.12);
      setPos({ x: current.current.x, y: current.current.y });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onHoverIn);
    window.addEventListener("mouseout", onHoverOut);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onHoverIn);
      window.removeEventListener("mouseout", onHoverOut);
    };
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-[999] mix-blend-difference"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        width: isHovering ? 48 : 12,
        height: isHovering ? 48 : 12,
        borderRadius: "50%",
        backgroundColor: "#C8FF00",
        transition: "width 0.3s ease, height 0.3s ease",
      }}
    />
  );
}

// ─── Animated Text ───────────────────────────────────────────────────────────

function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className ?? ""}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "110%", opacity: 0 }}
          animate={inView ? { y: "0%", opacity: 1 } : {}}
          transition={{
            duration: 0.65,
            delay: delay + i * 0.028,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
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

      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ y, opacity }}>
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
          <div className="whitespace-nowrap text-[clamp(2.75rem,8.5vw,9rem)] text-foreground">
            <SplitText text="MUHAMMAD" delay={0.5} />
          </div>
          <div className="whitespace-nowrap text-[clamp(2.75rem,8.5vw,9rem)] text-foreground -mt-2">
            <SplitText text="MUSTAFA" delay={0.6} className="text-accent" />
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
              Code meets
              <br />
              <span className="text-accent">intelligence.</span>
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
                  Projects
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
                  Skills
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
            LET&apos;S BUILD
            <br />
            <span className="text-accent">SOMETHING.</span>
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
      <CursorFollower />
      <Nav />
      <Hero />
      <About />
      <Work />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
