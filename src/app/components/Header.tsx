import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useApp } from "../ctx";

const navIds = ["home", "about", "projects", "skills", "contact"] as const;

const sectionIds: Record<typeof navIds[number], string> = {
  home: "hero",
  about: "about",
  projects: "projects",
  skills: "skills",
  contact: "contact",
};

/* SVG flags inline — sem depência externa */
function FlagBR({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="14" fill="#009C3B" rx="2" />
      <polygon points="10,1.5 18.5,7 10,12.5 1.5,7" fill="#FFDF00" />
      <circle cx="10" cy="7" r="3.2" fill="#002776" />
      <path d="M7,6.6 Q10,5.2 13,6.6" stroke="white" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

function FlagUS({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 14" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="14" fill="#B22234" rx="2" />
      {[1, 3, 5, 7, 9, 11, 13].map((y) => (
        <rect key={y} x="0" y={y} width="20" height="1" fill="white" />
      ))}
      <rect width="8" height="7" fill="#3C3B6E" rx="1" />
      {[1.5, 3.5, 5.5].map((cy) =>
        [1, 2.5, 4, 5.5, 7].map((cx) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.4" fill="white" />
        ))
      )}
    </svg>
  );
}

export function Header() {
  const { isDark, toggleTheme, language, setLanguage, t } = useApp();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navIds.map((id) => ({
        id,
        el: document.getElementById(sectionIds[id]),
      }));
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s?.el && window.scrollY >= s.el.offsetTop - 120) {
          setActiveSection(s.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: typeof navIds[number]) => {
    document.getElementById(sectionIds[id])?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const toggleLanguage = () => setLanguage(language === "pt-BR" ? "en" : "pt-BR");

  const navLabels: Record<string, string> = {
    home: t.nav.home,
    about: t.nav.about,
    projects: t.nav.projects,
    skills: t.nav.skills,
    contact: t.nav.contact,
  };

  const bgClass = isDark
    ? scrolled
      ? "bg-slate-950/80 border-slate-800/60 shadow-slate-950/50 shadow-lg"
      : "bg-transparent border-transparent"
    : scrolled
    ? "bg-white/80 border-gray-200/60 shadow-gray-200/50 shadow-lg"
    : "bg-transparent border-transparent";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md border-b ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => scrollToSection("home")}
          className={`relative group cursor-pointer ${isDark ? "text-white" : "text-gray-900"}`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            style={{
              backgroundImage: "linear-gradient(90deg, #a78bfa, #60a5fa, #a78bfa)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="font-mono tracking-tight"
          >
            {"<dev />"}
          </span>
        </motion.button>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          onMouseEnter={() => setIsNavHovered(true)}
          onMouseLeave={() => { setIsNavHovered(false); setHoveredItem(null); }}
        >
          {navIds.map((id) => {
            const isHovered = hoveredItem === id;
            const isActive = activeSection === id;
            const isBlurred = isNavHovered && !isHovered;
            return (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                onMouseEnter={() => setHoveredItem(id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  filter: isBlurred ? "blur(2.5px)" : "blur(0px)",
                  opacity: isBlurred ? 0.35 : 1,
                  transition: "filter 0.25s ease, opacity 0.25s ease, color 0.2s ease",
                }}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? isDark ? "text-white" : "text-gray-900"
                    : isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav"
                    className="absolute inset-0 rounded-lg bg-purple-500/15 border border-purple-500/30"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{navLabels[id]}</span>
              </button>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Flag Language Toggle — desktop */}
          <motion.button
            onClick={toggleLanguage}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={`hidden md:flex relative w-10 h-10 rounded-lg items-center justify-center overflow-hidden cursor-pointer transition-colors ${
              isDark ? "bg-slate-800/70 hover:bg-slate-700" : "bg-gray-100 hover:bg-gray-200"
            }`}
            aria-label="Toggle language"
            title={language === "pt-BR" ? "Switch to English" : "Mudar para Português"}
          >
            <AnimatePresence mode="wait">
              {language === "pt-BR" ? (
                <motion.div
                  key="br"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <FlagBR className="w-6 h-[17px] rounded-sm shadow-sm" />
                </motion.div>
              ) : (
                <motion.div
                  key="us"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                >
                  <FlagUS className="w-6 h-[17px] rounded-sm shadow-sm" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className={`relative w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
              isDark
                ? "bg-slate-800/70 text-yellow-400 hover:bg-slate-700"
                : "bg-gray-100 text-purple-600 hover:bg-gray-200"
            }`}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  <Sun className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  <Moon className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileOpen((v) => !v)}
            whileTap={{ scale: 0.92 }}
            className={`md:hidden w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer ${
              isDark
                ? "bg-slate-800/70 text-white hover:bg-slate-700"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`md:hidden overflow-hidden border-t ${
              isDark
                ? "border-slate-800 bg-slate-950/95 backdrop-blur-xl"
                : "border-gray-200 bg-white/95 backdrop-blur-xl"
            }`}
          >
            <div className="px-4 py-4 space-y-1">
              {navIds.map((id, i) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollToSection(id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === id
                      ? "bg-purple-500/15 border border-purple-500/30 text-purple-400"
                      : isDark
                      ? "text-gray-300 hover:bg-slate-800 hover:text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {navLabels[id]}
                </motion.button>
              ))}

              {/* Mobile Flag Toggle */}
              <div className="pt-3 pb-1">
                <motion.button
                  onClick={toggleLanguage}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full flex items-center justify-center gap-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isDark
                      ? "bg-slate-800 text-gray-300 hover:bg-slate-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {language === "pt-BR" ? (
                      <motion.div
                        key="br-mobile"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center gap-2"
                      >
                        <FlagBR className="w-6 h-[17px] rounded-sm" />
                        <span>Português</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="us-mobile"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.18 }}
                        className="flex items-center gap-2"
                      >
                        <FlagUS className="w-6 h-[17px] rounded-sm" />
                        <span>English</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
