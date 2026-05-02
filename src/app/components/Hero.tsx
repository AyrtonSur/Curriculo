import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useApp } from "../ctx";
import { ParticleCanvas } from "./ParticleCanvas";

function useTypingAnimation(
  phrases: string[],
  typingSpeed = 75,
  deleteSpeed = 40,
  pauseDuration = 2200
) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(id);
  }, []);

  // Reset animation when language (phrases) changes
  const prevPhrasesRef = useRef(phrases);
  useEffect(() => {
    if (prevPhrasesRef.current !== phrases) {
      prevPhrasesRef.current = phrases;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setDisplayText("");
      setPhraseIndex(0);
      setIsDeleting(false);
    }
  }, [phrases]);

  useEffect(() => {
    if (!started || phrases.length === 0) return;

    const idx = phraseIndex % phrases.length;
    const current = phrases[idx];
    if (!current) return;

    const schedule = (fn: () => void, delay: number) => {
      timeoutRef.current = setTimeout(fn, delay);
    };

    if (!isDeleting) {
      if (displayText.length < current.length) {
        schedule(
          () => setDisplayText(current.slice(0, displayText.length + 1)),
          typingSpeed
        );
      } else {
        schedule(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        schedule(
          () => setDisplayText(current.slice(0, displayText.length - 1)),
          deleteSpeed
        );
      } else {
        setIsDeleting(false);
        setPhraseIndex((i) => i + 1);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [started, displayText, isDeleting, phraseIndex, phrases, typingSpeed, deleteSpeed, pauseDuration]);

  return displayText;
}

export function Hero() {
  const { isDark, t } = useApp();
  const [isMobile, setIsMobile] = useState(false);
  const displayText = useTypingAnimation(t.hero.roles);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={`relative h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950/60 to-slate-900"
          : "bg-gradient-to-br from-slate-100 via-purple-50 to-white"
      }`}
    >
      {/* Blink keyframe */}
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>

      {/* Interactive particle canvas */}
      <ParticleCanvas isDark={isDark} isMobile={isMobile} />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(109,40,217,0.12) 0%, transparent 70%)"
            : "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(167,139,250,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border text-sm tracking-widest uppercase ${
              isDark
                ? "border-purple-500/30 bg-purple-500/10 text-purple-300"
                : "border-purple-400/40 bg-purple-100/60 text-purple-700"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Portfólio
          </motion.div>

          {/* Typing title */}
          <h1
            className="text-5xl md:text-7xl mb-6"
            style={{
              minHeight: "1.25em",
              backgroundImage: isDark
                ? "linear-gradient(90deg, #f8fafc, #a78bfa, #60a5fa)"
                : "linear-gradient(90deg, #1e1b4b, #7c3aed, #2563eb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {displayText}
            <span
              style={{
                WebkitTextFillColor: isDark ? "#a78bfa" : "#7c3aed",
                animation: "blink 1.05s step-end infinite",
                display: "inline",
              }}
            >
              |
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className={`text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
          >
            <motion.button
              onClick={() => scrollTo("projects")}
              className="relative overflow-hidden px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors cursor-pointer group"
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <span className="relative z-10">{t.hero.viewProjects}</span>
            </motion.button>

            <motion.button
              onClick={() => scrollTo("contact")}
              className={`px-8 py-3 border-2 border-purple-600 rounded-full transition-colors cursor-pointer ${
                isDark
                  ? "text-white hover:bg-purple-600/20"
                  : "text-purple-700 hover:bg-purple-50"
              }`}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              {t.hero.contact}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => scrollTo("about")}
      >
        <span
          className={`text-xs tracking-widest uppercase ${
            isDark ? "text-white/30" : "text-gray-400"
          }`}
        >
          scroll
        </span>
        <ChevronDown
          className={`w-5 h-5 ${isDark ? "text-white/40" : "text-gray-400"}`}
        />
      </motion.div>
    </section>
  );
}