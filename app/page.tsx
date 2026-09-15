"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronRight,
  Clipboard,
  Code2,
  ContactRound,
  Download,
  Mail,
  MapPin,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  experience,
  profile,
  projects,
  skillGroups,
  type Project,
  type ProjectCategory,
} from "@/lib/portfolio";

const navItems = [
  { label: "Projects", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#capabilities" },
  { label: "Contact", href: "#contact" },
];


function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      className="section-heading"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.55 }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </motion.div>
  );
}

function ProjectCard({ project, onOpen, index }: { project: Project; onOpen: () => void; index: number }) {
  const Icon = project.icon;
  return (
    <motion.button
      type="button"
      className={`project-card project-card--${project.accent}`}
      onClick={onOpen}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24) }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      aria-label={`View details for ${project.title}`}
    >
      <div className="project-card__top">
        <span className="project-icon"><Icon size={20} /></span>
        <span className="project-category-badge">{project.category}</span>
      </div>
      <div className="project-card__body">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <div className="project-result-strip">
        <span className="result-label">Result</span>
        <span className="result-text">{project.result}</span>
      </div>
      <div className="project-card__footer">
        <div className="tech-preview">
          {project.technologies.slice(0, 3).map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
        <span className="case-link">Details <ArrowUpRight size={14} /></span>
      </div>
    </motion.button>
  );
}

function ProjectDrawer({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="drawer-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <motion.aside
            className={`project-drawer project-card--${project.accent}`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 34, stiffness: 310 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-drawer-title"
          >
            <button className="icon-button drawer-close" type="button" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>

            <span className="drawer-category">{project.category}</span>
            <h2 id="project-drawer-title">{project.title}</h2>
            <p className="drawer-summary">{project.summary}</p>

            <div className="result-panel">
              <span>Outcome</span>
              <strong>{project.result}</strong>
            </div>

            <div className="drawer-section">
              <h3>The challenge</h3>
              <p>{project.challenge}</p>
            </div>

            <div className="drawer-section">
              <h3>How I approached it</h3>
              <ol>
                {project.approach.map((item, index) => (
                  <li key={item}>
                    <span className="step-num">{index + 1}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="drawer-section">
              <h3>Technologies used</h3>
              <div className="tech-list">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </div>

            <p className="confidential-note">
              More details can be shared on request where project confidentiality allows.
            </p>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<"All" | ProjectCategory>("All");
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.3 });

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    const nextTheme = saved ?? preferred;
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

  const filteredProjects = useMemo(
    () => (filter === "All" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      {/* ── Header ── */}
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Go to top">
          <span className="brand-avatar">AR</span>
          <strong>Abdul Rafay</strong>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle color theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a className="header-contact" href={`mailto:${profile.email}`}>Let&apos;s talk <ArrowUpRight size={15} /></a>
          <button className="icon-button mobile-menu-button" type="button" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
            <Menu size={20} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div className="mobile-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="icon-button" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={20} /></button>
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item.label}<ChevronRight size={20} />
              </motion.a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section className="hero shell" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="availability"><span />{profile.availability}</div>
          <p className="hero-kicker">Deep Learning Engineer · Karachi, Pakistan</p>
          <h1>
            Building AI that works in the <em>real world</em>, not just in notebooks.
          </h1>
          <p className="hero-intro">{profile.introduction}</p>
          <div className="hero-actions">
            <a className="button button--primary" href="#work">See my projects <ArrowDown size={16} /></a>
            <a className="button button--secondary" href={profile.resumePath} download>
              Download CV <Download size={16} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero-profile-card"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
        >
          <div className="hpc-avatar">
            <Sparkles size={28} />
          </div>
          <div className="hpc-name">{profile.name}</div>
          <div className="hpc-role">{profile.role}</div>
          <div className="hpc-divider" />
          <div className="hpc-identity">
            <span className="hpc-tag hpc-tag--engineer">Deep Learning Engineer</span>
            <span className="hpc-tag hpc-tag--artist">Artist at heart</span>
          </div>
          <p className="hpc-bio">
            I train models by day and find beauty in form, colour, and craft by night. Both sides inform how I think about building things.
          </p>
          <div className="hpc-links">
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" className="hpc-link">
                <Code2 size={15} /> GitHub
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hpc-link">
                <ContactRound size={15} /> LinkedIn
              </a>
            )}
          </div>
        </motion.div>

        <motion.a
          className="scroll-hint"
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Scroll down <ArrowDown size={14} />
        </motion.a>
      </section>

      {/* ── Work / Projects ── */}
      <section className="section shell" id="work">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built."
          description="A selection of AI projects covering computer vision, document intelligence, and language systems. Click any project to see what problem it solved and how."
        />
        <div className="filter-row" role="group" aria-label="Filter projects">
          {(["All", "Computer Vision", "Multimodal AI", "Language AI"] as const).map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div layout key={project.slug} exit={{ opacity: 0, scale: 0.96 }}>
                <ProjectCard project={project} index={index} onOpen={() => setSelectedProject(project)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── Experience ── */}
      <section className="section shell" id="experience">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've worked."
          description="From intern to engineer in under a year — I went from building my first production model to owning entire AI pipelines."
        />
        <div className="timeline">
          {experience.map((item, index) => (
            <motion.article
              className="timeline-item"
              key={item.period}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="timeline-rail">
                <div className="timeline-dot"><Briefcase size={14} /></div>
                <div className="timeline-line" />
              </div>
              <div className="timeline-content">
                <div className="timeline-meta">
                  <span className="timeline-period">{item.period}</span>
                  <h3>{item.role}</h3>
                  <p className="timeline-company">{item.company}</p>
                </div>
                <p className="timeline-desc">{item.description}</p>
                <ul className="timeline-highlights">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}><Check size={14} />{highlight}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="section shell" id="capabilities">
        <SectionHeading
          eyebrow="Skills"
          title="What I work with."
          description="Deep enough to build from scratch, broad enough to connect all the moving parts."
        />
        <div className="capability-grid">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.article
                className="capability-card"
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <span className="capability-icon"><Icon size={20} /></span>
                <h3>{group.title}</h3>
                <div>
                  {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="contact shell" id="contact">
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <span className="eyebrow">Get in touch</span>
            <h2>Let&apos;s build something together.</h2>
            <p>Whether it&apos;s a new AI system, an existing pipeline that needs improving, or just a conversation about what&apos;s possible — I&apos;m happy to chat.</p>
          </div>
          <div className="contact-actions">
            <a className="button button--primary" href={`mailto:${profile.email}`}><Mail size={16} /> Send an email</a>
            <button className="button button--secondary" type="button" onClick={copyEmail}>
              {copied ? <Check size={16} /> : <Clipboard size={16} />}
              {copied ? "Copied!" : "Copy email"}
            </button>
          </div>
          <div className="contact-footer">
            <span><MapPin size={14} /> {profile.location}</span>
            <div className="social-links">
              {profile.github ? <a href={profile.github} target="_blank" rel="noreferrer"><Code2 size={16} /> GitHub</a> : null}
              {profile.linkedin ? <a href={profile.linkedin} target="_blank" rel="noreferrer"><ContactRound size={16} /> LinkedIn</a> : null}
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="site-footer shell">
        <span>© {new Date().getFullYear()} Abdul Rafay</span>
        <span>Made with care in Karachi 🇵🇰</span>
        <a href="#top">Back to top <ArrowUpRight size={13} /></a>
      </footer>

      <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}
