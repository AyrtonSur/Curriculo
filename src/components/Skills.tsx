import { Code2, Database, Wrench, Palette, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

const skillCategories = [
  {
    titleKey: 'skills.frontend',
    icon: Palette,
    descKey: 'skills.frontendDesc',
    items: ['React', 'TypeScript', 'HTML5', 'CSS3', 'Vite', 'JavaScript']
  },
  {
    titleKey: 'skills.backend',
    icon: Code2,
    descKey: 'skills.backendDesc',
    items: ['Node.js', 'Express.js', 'Fastify', 'Python', 'Prisma', 'Sequelize', 'Go', 'Rust', 'C', 'Java', 'Zod']
  },
  {
    titleKey: 'skills.database',
    icon: Database,
    descKey: 'skills.databaseDesc',
    items: ['PostgreSQL', 'MySQL', 'Redis', 'Pandas', 'NumPy']
  },
  {
    titleKey: 'skills.tools',
    icon: Wrench,
    descKey: 'skills.toolsDesc',
    items: ['Git', 'GitHub', 'Docker', 'VS Code', 'PyCharm', 'Postman', 'Insomnia', 'nginx', 'Linux']
  }
];

export function Skills() {
  const { t } = useLanguage();
  const [openCard, setOpenCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setOpenCard(openCard === index ? null : index);
  };

  return (
    <section id="skills" className="py-20 dark:bg-slate-900 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="dark:text-blue-400 text-blue-600 mb-4">
            {t('skills.title')}
          </h2>
          <p className="dark:text-slate-400 text-slate-600 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((skill, index) => {
            const Icon = skill.icon;
            const isOpen = openCard === index;
            
            return (
              <div 
                key={index}
                className={`dark:bg-slate-800/50 bg-white backdrop-blur-sm rounded-lg border dark:border-slate-700/50 border-slate-200 overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg ${
                  openCard === index ? 'row-span-2' : ''
                }`}
              >
                <button
                  onClick={() => toggleCard(index)}
                  className="w-full p-6 flex items-center justify-between dark:hover:bg-slate-700/30 hover:bg-slate-50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="dark:text-blue-400 text-blue-600 transform group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="dark:text-white text-slate-900 dark:group-hover:text-blue-300 group-hover:text-blue-700 transition-colors duration-200">
                      {t(skill.titleKey)}
                    </h3>
                  </div>
                  <div className="transform group-hover:scale-110 transition-transform duration-200">
                    {openCard === index ? (
                      <ChevronUp className="w-5 h-5 dark:text-slate-400 text-slate-500 group-hover:text-blue-600 transition-colors duration-200" />
                    ) : (
                      <ChevronDown className="w-5 h-5 dark:text-slate-400 text-slate-500 group-hover:text-blue-600 transition-colors duration-200" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openCard === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="dark:text-slate-400 text-slate-600 mb-4">
                      {t(skill.descKey)}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, itemIndex) => (
                        <span 
                          key={itemIndex}
                          className="dark:bg-blue-500/10 bg-blue-50 dark:text-blue-300 text-blue-700 px-3 py-1 rounded-full border dark:border-blue-500/20 border-blue-200 hover:scale-105 dark:hover:bg-blue-500/20 hover:bg-blue-100 dark:hover:border-blue-400/40 hover:border-blue-300 transition-all duration-200 cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}