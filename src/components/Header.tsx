import { Code2, Github, Linkedin, Mail } from 'lucide-react';
import { Sun, Moon, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';
import { X, Menu } from 'lucide-react';

export function Header() {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full dark:bg-slate-900/95 bg-white/95 backdrop-blur-sm z-50 border-b dark:border-slate-800 border-slate-200 shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="dark:text-blue-400 text-blue-600 transition-colors dark:hover:text-blue-300 hover:text-blue-700 font-semibold">
            &lt;Ayrton /&gt;
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="dark:text-slate-300 text-slate-700 dark:hover:text-blue-400 hover:text-blue-600 transition-colors">
              {t('nav.about')}
            </a>
            <a href="#skills" className="dark:text-slate-300 text-slate-700 dark:hover:text-blue-400 hover:text-blue-600 transition-colors">
              {t('nav.skills')}
            </a>
            <a href="#projetos" className="dark:text-slate-300 text-slate-700 dark:hover:text-blue-400 hover:text-blue-600 transition-colors">
              {t('nav.projects')}
            </a>
            <a href="#contato" className="dark:text-slate-300 text-slate-700 dark:hover:text-blue-400 hover:text-blue-600 transition-colors">
              {t('nav.contact')}
            </a>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="hidden md:flex p-2 rounded-lg dark:bg-slate-800 bg-slate-100 dark:hover:bg-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            <button
              onClick={toggleLanguage}
              className="hidden md:flex px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-semibold text-sm items-center gap-1.5"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              {language === 'pt' ? 'EN' : 'PT'}
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg dark:bg-slate-800 bg-slate-100 dark:hover:bg-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 dark:text-slate-300 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 dark:text-slate-300 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t dark:border-slate-800 border-slate-200">
            <div className="flex flex-col gap-2">
              <a href="#sobre" className="px-4 py-2.5 dark:text-slate-300 text-slate-700 dark:hover:text-blue-400 hover:text-blue-600 dark:hover:bg-slate-800/30 hover:bg-slate-50 rounded-lg transition-all font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('nav.about')}
              </a>
              <a href="#skills" className="px-4 py-2.5 dark:text-slate-300 text-slate-700 dark:hover:text-blue-400 hover:text-blue-600 dark:hover:bg-slate-800/30 hover:bg-slate-50 rounded-lg transition-all font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('nav.skills')}
              </a>
              <a href="#projetos" className="px-4 py-2.5 dark:text-slate-300 text-slate-700 dark:hover:text-blue-400 hover:text-blue-600 dark:hover:bg-slate-800/30 hover:bg-slate-50 rounded-lg transition-all font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('nav.projects')}
              </a>
              <a href="#contato" className="px-4 py-2.5 dark:text-slate-300 text-slate-700 dark:hover:text-blue-400 hover:text-blue-600 dark:hover:bg-slate-800/30 hover:bg-slate-50 rounded-lg transition-all font-medium" onClick={() => setIsMenuOpen(false)}>
                {t('nav.contact')}
              </a>
              
              {/* Mobile Theme and Language Controls */}
              <div className="flex justify-between gap-2 pt-2 mt-2 w-full">
                <button
                  onClick={toggleTheme}
                  className="flex-1 px-3 py-2.5 rounded-lg dark:bg-slate-800/50 bg-slate-100 dark:hover:bg-slate-700 hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-5 h-5 text-yellow-400" />
                      <span className="dark:text-slate-300 text-slate-700 font-medium text-sm">Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 text-slate-600" />
                      <span className="dark:text-slate-300 text-slate-700 font-medium text-sm">Dark</span>
                    </>
                  )}
                </button>

                <button
                  onClick={toggleLanguage}
                  className="flex-1 px-3 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-white"
                  aria-label="Toggle language"
                >
                  <Languages className="w-5 h-5" />
                  <span className="font-medium text-sm">
                    {language === 'pt' ? 'EN' : 'PT'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}