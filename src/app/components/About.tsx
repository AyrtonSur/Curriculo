import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Code2, Database, Palette, Zap } from "lucide-react";
import { useApp } from "../ctx";

const featureIcons = [Code2, Database, Palette, Zap];

export function About() {
  const { isDark, t } = useApp();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={ref}
      className={`min-h-screen py-20 px-4 md:px-8 transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-900 to-slate-950"
          : "bg-gradient-to-br from-white to-slate-50"
      }`}
    >
      <div className="max-w-6xl mx-auto">
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
            {t.about.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className={`text-lg md:text-xl text-center mb-16 max-w-3xl mx-auto leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {t.about.description}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.about.features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={!isMobile ? { y: -10, scale: 1.02 } : {}}
                className={`p-6 rounded-2xl border transition-colors ${
                  isDark
                    ? "bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50"
                    : "bg-white/80 backdrop-blur-sm border-gray-200/80 hover:border-purple-400/60 shadow-sm hover:shadow-md"
                }`}
              >
                <motion.div
                  className="w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4"
                  whileHover={!isMobile ? { rotate: 360 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3
                  className={`text-xl mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}