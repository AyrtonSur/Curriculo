import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { useApp } from "../ctx";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const SECTION_VH = 380;

const projectMeta = [
  {
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    accentColor: "#a855f7",
    image: "https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZyUyMHdlYnNpdGUlMjBkYXJrJTIwVUl8ZW58MXx8fHwxNzc3MTUyNTA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2025",
  },
  {
    tags: ["TypeScript", "D3.js", "WebSocket", "Redis"],
    accentColor: "#3b82f6",
    image: "https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3NzE1MjUwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2025",
  },
  {
    tags: ["React Native", "Firebase", "GraphQL", "AWS"],
    accentColor: "#f97316",
    image: "https://images.unsplash.com/photo-1710870509663-16f20f75d758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMG1vYmlsZSUyMGFwcCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzcxNTI1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2024",
  },
  {
    tags: ["Python", "OpenAI", "FastAPI", "Docker"],
    accentColor: "#22c55e",
    image: "https://images.unsplash.com/photo-1751448582395-27fc57293f1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwY2hhdCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc3MTUyNTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    year: "2024",
  },
];

interface Project {
  title: string;
  description: string;
  tags: string[];
  accentColor: string;
  image: string;
  year: string;
}

export function Projects() {
  const { isDark, t } = useApp();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);

  const xMotionValue = useMotionValue(0);
  const xSpring = useSpring(xMotionValue, {
    stiffness: 60,
    damping: 18,
    mass: 0.8,
  });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrolled = window.scrollY - sectionTop;
      const totalScrollable = section.offsetHeight - window.innerHeight;
      const prog = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setProgress(prog);

      const maxTranslate = track.scrollWidth - window.innerWidth + 80;
      xMotionValue.set(-prog * maxTranslate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, xMotionValue]);

  const projects: Project[] = t.projects.items.map((item, i) => ({
    ...item,
    ...projectMeta[i],
  }));

  /* ── Mobile: lista vertical simples ── */
  if (isMobile) {
    return (
      <section
        className={`py-20 px-4 transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
            : "bg-gradient-to-br from-slate-50 via-white to-slate-50"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t.projects.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full" />
          </div>
          <div className="flex flex-col gap-6">
            {projects.map((project) => (
              <MobileProjectCard key={project.title} project={project} isDark={isDark} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── Desktop: carousel horizontal driven por scroll ── */
  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: `${SECTION_VH}vh` }}
    >
      <div
        className={`sticky top-0 h-screen overflow-hidden transition-colors duration-500 ${
          isDark
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
            : "bg-gradient-to-br from-slate-50 via-white to-slate-50"
        }`}
      >
        {/* Título apenas no topo esquerdo */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center px-10 pt-8 pointer-events-none">
          <h2 className={`text-3xl md:text-4xl ${isDark ? "text-white" : "text-gray-900"}`}>
            {t.projects.title}
          </h2>
        </div>

        {/* Track horizontal */}
        <div className="absolute inset-0 flex items-center">
          <motion.div
            ref={trackRef}
            className="flex gap-8 pl-10 pr-24"
            style={{ x: xSpring }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isDark={isDark}
              />
            ))}
            <SeeMoreCard isDark={isDark} t={t} />
          </motion.div>
        </div>

        {/* Indicador de progresso na parte inferior */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex items-center justify-center gap-5 pointer-events-none">
          <motion.span
            className={`text-xs font-mono tracking-widest uppercase ${isDark ? "text-gray-500" : "text-gray-400"}`}
            animate={{ opacity: progress < 0.05 ? [1, 0.3, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {progress < 0.05 ? "scroll" : `${Math.min(Math.ceil(progress * projects.length), projects.length)} / ${projects.length}`}
          </motion.span>

          <div
            className={`w-40 h-[2px] rounded-full overflow-hidden ${
              isDark ? "bg-slate-800" : "bg-gray-200"
            }`}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 origin-left"
              style={{ scaleX: progress }}
            />
          </div>

          <motion.span
            className={`text-xs font-mono ${isDark ? "text-gray-600" : "text-gray-300"}`}
            animate={{ opacity: progress < 0.05 ? [1, 0.3, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ↓
          </motion.span>
        </div>

        {/* Linha de acento no rodapé */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      </div>
    </div>
  );
}

/* ── Card de projeto ── */
function ProjectCard({
  project,
  index,
  isDark,
}: {
  project: Project;
  index: number;
  isDark: boolean;
}) {
  const { t } = useApp();

  return (
    <motion.div
      className="relative shrink-0 group cursor-pointer"
      style={{ width: "clamp(320px, 30vw, 460px)" }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div
        className={`relative h-[520px] rounded-2xl overflow-hidden border transition-all duration-500 ${
          isDark
            ? "bg-slate-900/70 backdrop-blur-md border-slate-700/40 hover:border-slate-500/60"
            : "bg-white/80 backdrop-blur-md border-gray-200/60 hover:border-gray-400/60 shadow-lg hover:shadow-2xl"
        }`}
      >
        {/* Imagem */}
        <div className="relative h-[55%] overflow-hidden">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              isDark
                ? "from-slate-900 via-slate-900/20 to-transparent"
                : "from-white via-white/10 to-transparent"
            }`}
          />
          <div
            className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-sm text-white font-mono"
            style={{ background: project.accentColor }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <span
            className={`absolute top-4 right-4 text-sm font-mono ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {project.year}
          </span>
        </div>

        {/* Conteúdo */}
        <div className="p-6 flex flex-col h-[45%]">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-0.5 text-xs rounded-full font-mono ${
                  isDark
                    ? "bg-slate-800 text-gray-400 border border-slate-700/50"
                    : "bg-gray-100 text-gray-500 border border-gray-200"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h3
            className={`text-xl mb-2 leading-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {project.title}
          </h3>

          <p
            className={`text-sm leading-relaxed flex-1 line-clamp-3 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {project.description}
          </p>

          <div
            className="flex items-center justify-between mt-4 pt-4 border-t border-dashed"
            style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
          >
            <motion.a
              href="#"
              className="flex items-center gap-1.5 text-sm group/link"
              style={{ color: project.accentColor }}
              whileHover={{ x: 4 }}
            >
              {t.projects.viewProject}
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
            </motion.a>
            <div className="flex gap-2">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-700"
                }`}
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-700"
                }`}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Glow interno no hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${project.accentColor}40` }}
        />
      </div>

      {/* Glow externo */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl -z-10"
        style={{ background: `${project.accentColor}18` }}
      />
    </motion.div>
  );
}

/* ── Card "ver mais" ── */
function SeeMoreCard({ isDark, t }: { isDark: boolean; t: any }) {
  return (
    <motion.div
      className="relative shrink-0 group cursor-pointer"
      style={{ width: "clamp(240px, 22vw, 320px)" }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.7 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div
        className={`h-[520px] rounded-2xl border flex flex-col items-center justify-center gap-6 transition-all duration-500 ${
          isDark
            ? "bg-slate-900/40 backdrop-blur-md border-slate-700/30 hover:border-purple-500/40"
            : "bg-white/50 backdrop-blur-md border-gray-200/40 hover:border-purple-400/40 shadow-sm"
        }`}
      >
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110 ${
            isDark
              ? "border-slate-600 group-hover:border-purple-500"
              : "border-gray-300 group-hover:border-purple-500"
          }`}
        >
          <ArrowRight
            className={`w-6 h-6 transition-colors duration-300 ${
              isDark
                ? "text-gray-500 group-hover:text-purple-400"
                : "text-gray-400 group-hover:text-purple-500"
            }`}
          />
        </div>
        <div className="text-center px-6">
          <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {t.projects.moreSoon}
          </p>
          <p className={`text-xs ${isDark ? "text-gray-600" : "text-gray-400"}`}>
            GitHub ↗
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Card mobile ── */
function MobileProjectCard({ project, isDark }: { project: Project; isDark: boolean }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border transition-all ${
        isDark
          ? "bg-slate-800/50 border-slate-700/50"
          : "bg-white/90 border-gray-200/80 shadow-sm"
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            isDark ? "from-slate-800 via-transparent" : "from-white via-transparent"
          }`}
        />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-0.5 text-xs rounded-full ${
                isDark ? "bg-slate-700 text-gray-300" : "bg-gray-100 text-gray-600"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className={`text-xl mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
          {project.title}
        </h3>
        <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {project.description}
        </p>
        <div className="flex gap-3 mt-4">
          <a href="#" className={`p-2 rounded-lg ${isDark ? "bg-slate-700/50" : "bg-gray-100"}`}>
            <Github className={`w-4 h-4 ${isDark ? "text-gray-300" : "text-gray-600"}`} />
          </a>
          <a href="#" className={`p-2 rounded-lg ${isDark ? "bg-slate-700/50" : "bg-gray-100"}`}>
            <ExternalLink className={`w-4 h-4 ${isDark ? "text-gray-300" : "text-gray-600"}`} />
          </a>
        </div>
      </div>
    </div>
  );
}