import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Mail, Send } from "lucide-react";
import { IconGitHub, IconLinkedIn, IconX } from "./icons/BrandIcons";
import { useApp } from "../ctx";

const socialLinks = [
  { icon: IconGitHub, href: "https://github.com/AyrtonSur", label: "GitHub", hoverDark: "#ffffff", hoverLight: "#111827" },
  { icon: IconLinkedIn, href: "https://www.linkedin.com/in/ayrton-surica/", label: "LinkedIn", hoverDark: "#60a5fa", hoverLight: "#2563eb" },
  { icon: IconX, href: "https://x.com/AyrtonSurica", label: "Twitter / X", hoverDark: "#38bdf8", hoverLight: "#0ea5e9" },
  { icon: Mail, href: "mailto:ayrtonsurica@gmail.com", label: "Email", hoverDark: "#c084fc", hoverLight: "#9333ea" },
];

export function Contact() {
  const { isDark, t } = useApp();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contato via portfólio — ${formData.name}`);
    const body = encodeURIComponent(
      `Nome: ${formData.name}\nE-mail: ${formData.email}\n\n${formData.message}`
    );
    window.location.href = `mailto:ayrtonsurica@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      ref={ref}
      className={`min-h-screen py-20 px-4 md:px-8 relative overflow-hidden transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900"
          : "bg-gradient-to-br from-slate-100 via-purple-50 to-white"
      }`}
    >
      {/* Animated background particles - apenas desktop */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                isDark ? "bg-purple-500 opacity-30" : "bg-purple-400 opacity-20"
              }`}
              animate={{
                y: [0, -1000],
                x: [0, Math.random() * 100 - 50],
                opacity: [0, isDark ? 0.5 : 0.3, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: "100%",
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t.contact.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full" />
          <p
            className={`mt-6 text-lg ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`rounded-2xl p-8 border ${
              isDark
                ? "bg-slate-800/50 backdrop-blur-sm border-slate-700/50"
                : "bg-white/80 backdrop-blur-sm border-gray-200/80 shadow-sm"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className={`block mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t.contact.nameLabel}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors ${
                    isDark
                      ? "bg-slate-900/50 border-slate-600 text-white focus:border-purple-500 placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-500 placeholder-gray-400"
                  }`}
                  placeholder={t.contact.namePlaceholder}
                />
              </div>

              <div>
                <label
                  className={`block mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t.contact.emailLabel}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors ${
                    isDark
                      ? "bg-slate-900/50 border-slate-600 text-white focus:border-purple-500 placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-500 placeholder-gray-400"
                  }`}
                  placeholder={t.contact.emailPlaceholder}
                />
              </div>

              <div>
                <label
                  className={`block mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {t.contact.messageLabel}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-colors resize-none ${
                    isDark
                      ? "bg-slate-900/50 border-slate-600 text-white focus:border-purple-500 placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-500 placeholder-gray-400"
                  }`}
                  placeholder={t.contact.messagePlaceholder}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={!isMobile ? { scale: 1.02 } : {}}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.contact.send}</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h3
              className={`text-2xl mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t.contact.connect}
            </h3>
            <p
              className={`mb-8 leading-relaxed ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {t.contact.connectDesc}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => {
                const isHovered = hoveredIndex === index;
                const color = isHovered
                  ? isDark ? social.hoverDark : social.hoverLight
                  : isDark ? "#d1d5db" : "#4b5563";

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    whileHover={!isMobile ? { scale: 1.05, y: -5 } : {}}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{ color }}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      isDark
                        ? "bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50"
                        : "bg-white/80 backdrop-blur-sm border-gray-200/80 hover:border-purple-400/50 shadow-sm hover:shadow-md"
                    }`}
                  >
                    <social.icon className="w-6 h-6" />
                    <span>{social.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className={`text-center pt-8 border-t ${
            isDark
              ? "text-gray-400 border-slate-700/50"
              : "text-gray-500 border-gray-200"
          }`}
        >
          <p>{t.contact.footer}</p>
        </motion.div>
      </div>
    </section>
  );
}