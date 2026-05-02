import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Code2, Server, Database, Monitor, MapPin, ExternalLink, GraduationCap } from "lucide-react";
import { useApp } from "../ctx";
import { IconGitHub, IconLinkedIn } from "./icons/BrandIcons";
import photoUrl from "../../assets/Ayrton.png";

const socialLinks = [
  { Icon: IconGitHub, href: "https://github.com/AyrtonSur", label: "GitHub" },
  { Icon: IconLinkedIn, href: "https://www.linkedin.com/in/ayrton-surica/", label: "LinkedIn" },
];

export function About() {
  const { isDark, t } = useApp();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const card = isDark
    ? "bg-slate-800/50 backdrop-blur-sm border-slate-700/50"
    : "bg-white/80 backdrop-blur-sm border-gray-200/80 shadow-sm";

  const featureCard = `p-6 rounded-2xl border transition-colors ${
    isDark
      ? "bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/40"
      : "bg-white/80 backdrop-blur-sm border-gray-200/80 hover:border-purple-400/50 shadow-sm hover:shadow-md"
  }`;

  return (
    <section
      ref={ref}
      className={`pt-20 lg:pt-44 pb-20 px-4 md:px-8 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 to-slate-950"
          : "bg-gradient-to-br from-white to-slate-50"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-5xl mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
            {t.about.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full" />
        </motion.div>

        {/*
          lg (4 cols):
          row 1 → Bio (col-span-4)
          row 2 → Clean Code | Photo (col-span-2, row-span-2) | Experiência (row-span-2)
          row 3 → APIs/Backend | Photo cont. | Experiência cont.
          row 4 → Banco de Dados (col-span-2) | React/Frontend (col-span-2)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* ── Bio — row 1, cols 1-3 ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`md:col-span-2 lg:col-span-3 p-7 rounded-2xl border ${card}`}
          >
            <p className={`text-xs uppercase tracking-widest mb-4 ${isDark ? "text-purple-400" : "text-purple-600"}`}>
              Bio
            </p>
            <p className={`text-lg leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {t.about.description}
            </p>
          </motion.div>

          {/* ── Formação — row 1, col 4 ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`p-6 rounded-2xl border flex flex-col justify-between ${card}`}
          >
            <div className="flex items-center justify-between">
              <p className={`text-xs uppercase tracking-widest ${isDark ? "text-purple-400" : "text-purple-600"}`}>
                {t.about.academic.title}
              </p>
              <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-3">
              <div>
                <a
                  href={t.about.academic.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 text-lg font-bold group transition-colors ${
                    isDark ? "text-white hover:text-purple-400" : "text-gray-900 hover:text-purple-600"
                  }`}
                >
                  {t.about.academic.institution}
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <p className={`text-xs mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {t.about.academic.fullName}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700/40">
              <p className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                {t.about.academic.course}
              </p>
              <p className={`text-xs mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                {t.about.academic.period}
              </p>
            </div>
          </motion.div>

          {/* ── Clean Code — row 2, col 1 ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={!isMobile ? { y: -4 } : {}}
            className={featureCard}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h4 className={`text-base font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t.about.features[0].title}
            </h4>
            <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {t.about.features[0].description}
            </p>
          </motion.div>

          {/* ── Photo — row 2-3, cols 2-3 ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative lg:col-span-2 lg:row-span-2 lg:min-h-[400px]"
            style={{ zIndex: 10, overflow: "visible" }}
          >
            <div className={`absolute inset-0 rounded-2xl border ${
              isDark
                ? "bg-gradient-to-b from-slate-800 to-slate-900 border-slate-700/50"
                : "bg-gradient-to-b from-gray-100 to-gray-200 border-gray-200"
            }`} />

            {/* Mobile / tablet: photo contained */}
            <div className="relative h-64 md:h-72 lg:hidden">
              <img
                src={photoUrl}
                alt="Ayrton Surica"
                className="absolute inset-0 w-full h-full object-contain object-bottom"
                style={{ zIndex: 2 }}
              />
            </div>

            {/* Desktop: photo overflows above card */}
            <img
              src={photoUrl}
              alt="Ayrton Surica"
              className="hidden lg:block absolute bottom-[60px] left-1/2 -translate-x-1/2 w-[98%]"
              style={{ zIndex: 2 }}
            />

            <div
              className={`absolute bottom-0 left-0 right-0 px-5 pb-5 pt-16 rounded-b-2xl ${
                isDark
                  ? "bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent"
                  : "bg-gradient-to-t from-gray-200 via-gray-200/95 to-transparent"
              }`}
              style={{ zIndex: 3 }}
            >
              <p className="text-purple-400 text-xs uppercase tracking-widest mb-0.5">
                Backend Developer
              </p>
              <h3 className={`text-xl font-bold mb-1.5 ${isDark ? "text-white" : "text-gray-900"}`}>
                Ayrton Surica
              </h3>
              <div className={`flex items-center gap-1.5 text-xs mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                <MapPin className="w-3 h-3 shrink-0" />
                <span>Rio de Janeiro, Brasil</span>
              </div>
              <div className="flex gap-2">
                {socialLinks.map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={!isMobile ? { scale: 1.1, y: -2 } : {}}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg border transition-colors ${
                      isDark
                        ? "bg-slate-800 border-slate-600/50 text-gray-300 hover:text-white hover:border-purple-500/50"
                        : "bg-white border-gray-300 text-gray-600 hover:text-gray-900 hover:border-purple-400/60"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Experiência — rows 2-3, col 4 ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className={`lg:row-span-2 p-6 rounded-2xl border flex flex-col ${card}`}
          >
            <p className={`text-xs uppercase tracking-widest mb-4 shrink-0 ${isDark ? "text-purple-400" : "text-purple-600"}`}>
              {t.about.experience.title}
            </p>

            <div className="relative flex flex-col flex-1 justify-around">
              {/* Vertical timeline line */}
              <div className={`absolute left-[7px] top-2 bottom-2 w-px ${isDark ? "bg-slate-600" : "bg-gray-300"}`} />

              {t.about.experience.items.map((item, i) => (
                <motion.div
                  key={item.company}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="pl-6 relative"
                >
                  <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 ${
                    isDark
                      ? "bg-slate-900 border-purple-500"
                      : "bg-white border-purple-500"
                  }`} />

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-sm font-semibold group mb-0.5 ${
                      isDark ? "text-white hover:text-purple-400" : "text-gray-900 hover:text-purple-600"
                    } transition-colors`}
                  >
                    {item.company}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <p className={`text-xs mb-0.5 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {item.role}
                  </p>
                  <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                    {item.period}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── APIs & Backend — row 3, col 1 ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={!isMobile ? { y: -4 } : {}}
            className={featureCard}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Server className="w-6 h-6 text-white" />
            </div>
            <h4 className={`text-base font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t.about.features[1].title}
            </h4>
            <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {t.about.features[1].description}
            </p>
          </motion.div>

          {/* ── Banco de Dados — row 4, cols 1-2 ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={!isMobile ? { y: -4 } : {}}
            className={`lg:col-span-2 ${featureCard}`}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-white" />
            </div>
            <h4 className={`text-base font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t.about.features[2].title}
            </h4>
            <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {t.about.features[2].description}
            </p>
          </motion.div>

          {/* ── React & Frontend — row 4, cols 3-4 ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={!isMobile ? { y: -4 } : {}}
            className={`lg:col-span-2 ${featureCard}`}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <h4 className={`text-base font-medium mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
              {t.about.features[3].title}
            </h4>
            <p className={`text-sm leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              {t.about.features[3].description}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
