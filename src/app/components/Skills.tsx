import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Monitor, Server, Wrench } from "lucide-react";
import { useApp } from "../ctx";

/* ─── Data ────────────────────────────────────────────────────── */
const categories = [
  {
    key: "Backend",
    icon: Server,
    gradient: "from-blue-600 to-cyan-500",
    glow: "rgba(59,130,246,0.25)",
    border: "border-blue-500/30",
    tag: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    tagLight: "bg-blue-100 text-blue-700 border-blue-300/60",
    skills: ["Ruby on Rails", "Node.js", "Fastify", "Prisma", "PostgreSQL", "Redis + BullMQ", "Event-Driven Arch", "REST APIs", "Go"],
  },
  {
    key: "Frontend",
    icon: Monitor,
    gradient: "from-purple-600 to-pink-600",
    glow: "rgba(168,85,247,0.25)",
    border: "border-purple-500/30",
    tag: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    tagLight: "bg-purple-100 text-purple-700 border-purple-300/60",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vite", "HTML / CSS"],
  },
  {
    key: "DevOps & Tools",
    icon: Wrench,
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.25)",
    border: "border-emerald-500/30",
    tag: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    tagLight: "bg-emerald-100 text-emerald-700 border-emerald-300/60",
    skills: ["Docker", "Git", "CI/CD", "Linux", "Python", "Vercel"],
  },
];

/* All skills flat — for the marquee */
const allSkills = categories.flatMap((c) => c.skills);
const marqueeRowA = [...allSkills, ...allSkills];
const marqueeRowB = [...[...allSkills].reverse(), ...[...allSkills].reverse()];

/* ─── Marquee Row ─────────────────────────────────────────────── */
function MarqueeRow({
  items,
  reverse = false,
  isDark,
}: {
  items: string[];
  reverse?: boolean;
  isDark: boolean;
}) {
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((skill, i) => (
          <span
            key={i}
            className={`shrink-0 px-4 py-1.5 rounded-full border text-sm whitespace-nowrap select-none transition-colors ${
              isDark
                ? "bg-slate-800/60 border-slate-700/60 text-slate-300"
                : "bg-white/80 border-gray-200 text-gray-600 shadow-sm"
            }`}
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Category Card ───────────────────────────────────────────── */
function CategoryCard({
  category,
  index,
  isInView,
  isDark,
  label,
}: {
  category: (typeof categories)[0];
  index: number;
  isInView: boolean;
  isDark: boolean;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.12, duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl p-6 border overflow-hidden transition-all duration-500 ${
        isDark
          ? `bg-slate-900/60 backdrop-blur-sm ${category.border}`
          : `bg-white/80 backdrop-blur-sm border-gray-200/80 shadow-md`
      }`}
      style={{
        boxShadow: hovered ? `0 0 40px ${category.glow}` : undefined,
      }}
    >
      {/* Subtle background gradient blob */}
      <div
        className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br ${category.gradient} opacity-10 blur-2xl transition-opacity duration-500 pointer-events-none`}
        style={{ opacity: hovered ? 0.2 : 0.08 }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${category.gradient}`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className={`text-xl ${isDark ? "text-white" : "text-gray-900"}`}>{label}</h3>
      </div>

      {/* Skill chips */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 + index * 0.12 + i * 0.05, duration: 0.35 }}
            className={`px-3 py-1 rounded-full border text-sm transition-all duration-200 cursor-default ${
              isDark ? category.tag : category.tagLight
            }`}
          >
            {skill}
          </motion.span>
        ))}
      </div>

      {/* Bottom gradient line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${category.gradient} transition-opacity duration-500`}
        style={{ opacity: hovered ? 1 : 0.3 }}
      />
    </motion.div>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */
export function Skills() {
  const { isDark, t } = useApp();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const categoryLabels = t.skills.categories;

  return (
    <section
      ref={ref}
      className={`min-h-screen py-20 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-b from-slate-50 via-white to-slate-50"
      }`}
    >
      {/* Title */}
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2
            className={`text-4xl md:text-5xl mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {t.skills.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full" />
          <p className={`mt-5 max-w-md mx-auto ${isDark ? "text-slate-400" : "text-gray-500"}`}>
            {t.skills.subtitle}
          </p>
        </motion.div>
      </div>

      {/* ── Marquees ── */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-16 flex flex-col gap-3 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <MarqueeRow items={marqueeRowA} isDark={isDark} />
          <MarqueeRow items={marqueeRowB} reverse isDark={isDark} />
        </motion.div>
      )}

      {/* ── Category Cards ── */}
      <div className="px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.key}
              category={cat}
              index={i}
              isInView={isInView}
              isDark={isDark}
              label={categoryLabels[i] ?? cat.key}
            />
          ))}
        </div>
      </div>
    </section>
  );
}