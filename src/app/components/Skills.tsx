import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Monitor, Server, Wrench, Moon, Sun, Star, Cloud, Flower, Flower2 } from "lucide-react";
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
    skills: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "Vite", "HTML / CSS"],
  },
  {
    key: "DevOps & Tools",
    icon: Wrench,
    gradient: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.25)",
    border: "border-emerald-500/30",
    tag: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    tagLight: "bg-emerald-100 text-emerald-700 border-emerald-300/60",
    skills: ["Docker", "Git", "CI/CD", "Linux", "Python", "Vercel", "FTP"],
  },
];

/* Skills with category metadata — for colour-coded marquee */
const skillsWithMeta = categories.flatMap((c) =>
  c.skills.map((skill) => ({ label: skill, tag: c.tag, tagLight: c.tagLight }))
);
const marqueeRowA = [...skillsWithMeta, ...skillsWithMeta];
const marqueeRowB = [...[...skillsWithMeta].reverse(), ...[...skillsWithMeta].reverse()];

/* ─── Marquee Row ─────────────────────────────────────────────── */
function MarqueeRow({
  items,
  reverse = false,
  isDark,
}: {
  items: { label: string; tag: string; tagLight: string }[];
  reverse?: boolean;
  isDark: boolean;
}) {
  return (
    <div className="overflow-x-hidden w-full py-1">
      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={`shrink-0 px-4 py-1.5 rounded-full border text-sm whitespace-nowrap select-none ${
              isDark ? item.tag : item.tagLight
            }`}
          >
            {item.label}
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
            whileHover={{ scale: 1.08 }}
            className={`px-3 py-1 rounded-full border text-sm transition-all duration-200 cursor-default hover:brightness-110 ${
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

/* ─── Black Hole ──────────────────────────────────────────────── */
function BlackHole({ isMobile }: { isMobile: boolean }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const collapseRef = useRef(false);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr  = Math.min(window.devicePixelRatio || 1, 2);
    const SIZE = 560;
    canvas.width        = SIZE * dpr;
    canvas.height       = SIZE * dpr;
    canvas.style.width  = `${SIZE}px`;
    canvas.style.height = `${SIZE}px`;

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const cx = SIZE / 2;
    const cy = SIZE / 2;
    const maxOrbit  = 255;
    const startTime = Date.now();
    let   currentTime = 0;
    let   rafId: number;

    function rotate(ox: number, oy: number, x: number, y: number, angle: number): [number, number] {
      const c = Math.cos(angle), s = Math.sin(angle);
      return [c * (x - ox) + s * (y - oy) + ox, c * (y - oy) - s * (x - ox) + oy];
    }

    class Star {
      orbital: number;
      x            = cx;
      y:           number;
      yOrigin:     number;
      hoverPos:    number;
      collapseBonus: number;
      speed:       number;
      startRotation: number;
      rotation     = 0;
      color:       string;
      prevR:       number;
      prevX        = cx;
      prevY:       number;

      constructor() {
        const r1 = Math.random() * (maxOrbit / 2) + 1;
        const r2 = Math.random() * (maxOrbit / 2) + maxOrbit;
        this.orbital       = (r1 + r2) / 2;
        this.y             = cy + this.orbital;
        this.yOrigin       = cy + this.orbital;
        this.collapseBonus = Math.max(0, this.orbital - maxOrbit * 0.7);
        this.hoverPos      = cy + maxOrbit / 2 + this.collapseBonus;
        this.speed         = (Math.floor(Math.random() * 2.5) + 1.5) * Math.PI / 180;
        this.startRotation = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180;
        this.color         = `rgba(255,255,255,${1 - this.orbital / 255})`;
        this.prevR         = this.startRotation;
        this.prevY         = this.y;
      }

      draw() {
        this.rotation = this.startRotation + currentTime * this.speed;

        if (!collapseRef.current) {
          if (this.y > this.yOrigin)          this.y -= 2.5;
          else if (this.y < this.yOrigin - 4) this.y += (this.yOrigin - this.y) / 10;
        } else {
          if (this.y > this.hoverPos)          this.y -= (this.hoverPos - this.y) / -5;
          else if (this.y < this.hoverPos - 4) this.y += 2.5;
        }

        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        const [ox, oy] = rotate(cx, cy, this.prevX, this.prevY, -this.prevR);
        ctx.moveTo(ox, oy);
        ctx.translate(cx, cy);
        ctx.rotate(this.rotation);
        ctx.translate(-cx, -cy);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.restore();

        this.prevR = this.rotation;
        this.prevX = this.x;
        this.prevY = this.y;
      }
    }

    const stars: Star[] = [];
    for (let i = 0; i < 2500; i++) stars.push(new Star());

    function loop() {
      currentTime = (Date.now() - startTime) / 50;

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, SIZE, SIZE);

      ctx.globalCompositeOperation = "source-over";
      for (const s of stars) s.draw();

      rafId = requestAnimationFrame(loop);
    }

    loop();
    return () => cancelAnimationFrame(rafId);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      style={{
        position: "absolute",
        bottom: -180,
        left: "50%",
        transform: "translateX(-50%)",
        width: 560,
        height: 560,
        cursor: "crosshair",
        pointerEvents: "auto",
      }}
      onMouseEnter={() => { collapseRef.current = true; }}
      onMouseLeave={() => { collapseRef.current = false; }}
    >
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
    </div>
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
      className={`relative overflow-hidden min-h-screen py-20 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-b from-white via-sky-200 to-sky-300"
      }`}
    >
      {/* Decorative celestial background */}
      <div className="absolute inset-x-0 top-0 h-64 pointer-events-none select-none">

        {/* DARK: Moon + Stars */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isDark ? "opacity-100" : "opacity-0"}`}>
          {/* Moon — top center */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2">
            <div className="absolute inset-0 blur-3xl bg-indigo-400/15 scale-150 rounded-full" />
            <Moon strokeWidth={0.4} className="relative text-slate-200" style={{ width: 180, height: 180, opacity: 0.2 }} />
          </div>
          {/* Stars scattered across full width */}
          {([
            { size: 14, top: 20,  left: "10%" },
            { size: 9,  top: 55,  left: "18%" },
            { size: 12, top: 12,  left: "32%" },
            { size: 7,  top: 80,  left: "42%" },
            { size: 10, top: 8,   left: "62%" },
            { size: 8,  top: 60,  left: "74%" },
            { size: 13, top: 24,  left: "85%" },
            { size: 6,  top: 90,  left: "90%" },
            { size: 9,  top: 44,  left: "95%" },
          ] as const).map((s, i) => (
            <motion.div
              key={i}
              className="absolute text-slate-200"
              style={{ top: s.top, left: s.left }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.45, 0.2] }}
              transition={{ duration: 2 + (i % 4) * 0.5, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
            >
              <Star size={s.size} fill="currentColor" strokeWidth={0} />
            </motion.div>
          ))}
        </div>

        {/* LIGHT: Sun + Clouds */}
        <div className={`absolute inset-0 transition-opacity duration-700 ${isDark ? "opacity-0" : "opacity-100"}`}>
          {/* Sun — top center */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <div className="absolute inset-0 blur-3xl bg-yellow-300/30 scale-150 rounded-full" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
              <Sun strokeWidth={0.5} className="relative text-yellow-300" style={{ width: 180, height: 180, opacity: 0.55 }} />
            </motion.div>
          </div>
          {/* Clouds scattered */}
          <Cloud strokeWidth={0.6} className="absolute top-8 text-white" style={{ left: "5%",  width: 110, height: 110, opacity: 0.7 }} />
          <Cloud strokeWidth={0.6} className="absolute top-16 text-white" style={{ left: "22%", width: 80,  height: 80,  opacity: 0.55 }} />
          <Cloud strokeWidth={0.6} className="absolute top-6 text-white" style={{ left: "68%", width: 100, height: 100, opacity: 0.65 }} />
          <Cloud strokeWidth={0.6} className="absolute top-20 text-white" style={{ left: "82%", width: 70,  height: 70,  opacity: 0.5 }} />
        </div>

      </div>

      {/* Title */}
      <div className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto">
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
          className="relative z-10 mb-16 flex flex-col gap-3 overflow-x-hidden"
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
      <div className="relative z-10 px-4 md:px-8 max-w-6xl mx-auto">
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

      {/* DARK: Black hole */}
      <div className={`absolute inset-0 pointer-events-none select-none transition-opacity duration-700 ${isDark ? "opacity-100" : "opacity-0"}`}>
        <BlackHole isMobile={isMobile} />
      </div>

      {/* LIGHT: Grass & Flowers */}
      <div className={`absolute bottom-0 inset-x-0 h-56 pointer-events-none select-none transition-opacity duration-700 ${isDark ? "opacity-0" : "opacity-100"}`}>
        <svg viewBox="0 0 1200 224" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
          <path d="M0,140 C200,90 400,135 600,100 C800,65 1000,118 1200,88 L1200,224 L0,224 Z" fill="#86efac" />
          <path d="M0,165 C150,120 350,158 550,125 C750,92 950,145 1200,115 L1200,224 L0,224 Z" fill="#4ade80" />
          <path d="M0,188 C250,155 500,182 750,158 C1000,134 1100,175 1200,155 L1200,224 L0,224 Z" fill="#22c55e" />
        </svg>

        {([
          { left: "3%",  bottom: 52, size: 22, color: "#f472b6", Icon: Flower2 },
          { left: "11%", bottom: 38, size: 19, color: "#facc15", Icon: Flower  },
          { left: "21%", bottom: 60, size: 24, color: "#c084fc", Icon: Flower2 },
          { left: "33%", bottom: 42, size: 20, color: "#f87171", Icon: Flower  },
          { left: "46%", bottom: 66, size: 23, color: "#fb7185", Icon: Flower2 },
          { left: "57%", bottom: 44, size: 18, color: "#fde047", Icon: Flower  },
          { left: "67%", bottom: 58, size: 25, color: "#a78bfa", Icon: Flower2 },
          { left: "78%", bottom: 40, size: 20, color: "#f472b6", Icon: Flower  },
          { left: "88%", bottom: 55, size: 22, color: "#f87171", Icon: Flower2 },
          { left: "95%", bottom: 36, size: 18, color: "#fde047", Icon: Flower  },
        ] as const).filter((_, i) => !isMobile || i % 2 === 0).map(({ left, bottom, size, color, Icon }, i) => (
          <div key={i} className="absolute" style={{ left, bottom }}>
            <Icon size={isMobile ? size * 0.8 : size} fill={color} stroke={color} strokeWidth={0.5} />
          </div>
        ))}
      </div>
    </section>
  );
}