import { Heart, Mail, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contato" className="dark:bg-slate-900 bg-slate-100 border-t dark:border-slate-800 border-slate-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="dark:text-blue-400 text-blue-600 mb-4">
              {t('footer.contact')}
            </h3>
            <div className="flex flex-col gap-3">
              <a href="mailto:ayrtonsurica@gmail.com" className="dark:text-slate-300 text-slate-600 dark:hover:text-blue-400 hover:text-blue-600 transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                ayrtonsurica@gmail.com
              </a>
              <a href="https://github.com/AyrtonSur" target="_blank" rel="noopener noreferrer" className="dark:text-slate-300 text-slate-600 dark:hover:text-blue-400 hover:text-blue-600 transition-colors flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/ayrton-surica" target="_blank" rel="noopener noreferrer" className="dark:text-slate-300 text-slate-600 dark:hover:text-blue-400 hover:text-blue-600 transition-colors flex items-center gap-2">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h3 className="dark:text-blue-400 text-blue-600 mb-4">
              {t('footer.quickLinks')}
            </h3>
            <div className="flex flex-col gap-3">
              <a href="#sobre" className="dark:text-slate-300 text-slate-600 dark:hover:text-blue-400 hover:text-blue-600 transition-colors">
                {t('nav.about')}
              </a>
              <a href="#skills" className="dark:text-slate-300 text-slate-600 dark:hover:text-blue-400 hover:text-blue-600 transition-colors">
                {t('nav.skills')}
              </a>
              <a href="#projetos" className="dark:text-slate-300 text-slate-600 dark:hover:text-blue-400 hover:text-blue-600 transition-colors">
                {t('nav.projects')}
              </a>
            </div>
          </div>

          <div>
            <h3 className="dark:text-blue-400 text-blue-600 mb-4">
              {t('footer.about')}
            </h3>
            <p className="dark:text-slate-400 text-slate-600">
              {t('footer.description')}
            </p>
          </div>
        </div>

        <div className="border-t dark:border-slate-800 border-slate-200 pt-8 text-center">
          <p className="dark:text-slate-400 text-slate-600">
            © 2024 Ayrton. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}