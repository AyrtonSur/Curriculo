import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Theme = "dark" | "light";
export type Language = "pt-BR" | "en";

interface NavTranslations {
  home: string;
  about: string;
  projects: string;
  skills: string;
  contact: string;
}

interface HeroTranslations {
  title: string;
  roles: string[];
  subtitle: string;
  viewProjects: string;
  contact: string;
}

interface FeatureItem {
  title: string;
  description: string;
}

interface AboutTranslations {
  title: string;
  description: string;
  features: FeatureItem[];
}

interface ProjectItem {
  title: string;
  description: string;
}

interface ProjectsTranslations {
  title: string;
  items: ProjectItem[];
}

interface SkillsTranslations {
  title: string;
  categories: string[];
}

interface ContactTranslations {
  title: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  send: string;
  connect: string;
  connectDesc: string;
  footer: string;
}

export interface AppTranslations {
  nav: NavTranslations;
  hero: HeroTranslations;
  about: AboutTranslations;
  projects: ProjectsTranslations;
  skills: SkillsTranslations;
  contact: ContactTranslations;
}

const ptBR: AppTranslations = {
  nav: {
    home: "Início",
    about: "Sobre",
    projects: "Projetos",
    skills: "Habilidades",
    contact: "Contato",
  },
  hero: {
    title: "Desenvolvedor Full Stack",
    roles: [
      "Desenvolvedor Full Stack",
      "Engenheiro de Software",
      "Especialista em React",
      "Criador de Interfaces",
      "Arquiteto de APIs",
    ],
    subtitle: "Transformando ideias em soluções digitais",
    viewProjects: "Ver Projetos",
    contact: "Contato",
  },
  about: {
    title: "Sobre Mim",
    description:
      "Sou um desenvolvedor apaixonado por criar experiências digitais incríveis. Com experiência em diversas tecnologias, transformo ideias em produtos funcionais e elegantes.",
    features: [
      {
        title: "Clean Code",
        description: "Código limpo, organizado e seguindo as melhores práticas",
      },
      {
        title: "Full Stack",
        description: "Experiência tanto em frontend quanto backend",
      },
      {
        title: "UI/UX Design",
        description: "Interfaces modernas e experiências intuitivas",
      },
      {
        title: "Performance",
        description: "Aplicações rápidas e otimizadas",
      },
    ],
  },
  projects: {
    title: "Projetos",
    items: [
      {
        title: "E-commerce Platform",
        description:
          "Plataforma completa de e-commerce com painel administrativo, processamento de pagamentos e gestão de inventário.",
      },
      {
        title: "Dashboard Analytics",
        description:
          "Dashboard interativo para visualização de dados em tempo real com gráficos e métricas customizáveis.",
      },
      {
        title: "Social Media App",
        description:
          "Aplicativo de rede social com feed personalizado, stories, mensagens e notificações em tempo real.",
      },
      {
        title: "AI Chat Assistant",
        description:
          "Assistente virtual inteligente com processamento de linguagem natural e integração com múltiplas APIs.",
      },
    ],
  },
  skills: {
    title: "Habilidades",
    categories: ["Frontend", "Backend", "DevOps & Tools"],
  },
  contact: {
    title: "Entre em Contato",
    subtitle: "Vamos trabalhar juntos no seu próximo projeto",
    nameLabel: "Nome",
    namePlaceholder: "Seu nome",
    emailLabel: "Email",
    emailPlaceholder: "seu@email.com",
    messageLabel: "Mensagem",
    messagePlaceholder: "Sua mensagem...",
    send: "Enviar Mensagem",
    connect: "Conecte-se Comigo",
    connectDesc:
      "Siga-me nas redes sociais para acompanhar meus projetos e novidades da área de desenvolvimento.",
    footer: "© 2026 Desenvolvedor Full Stack. Todos os direitos reservados.",
  },
};

const en: AppTranslations = {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
  },
  hero: {
    title: "Full Stack Developer",
    roles: [
      "Full Stack Developer",
      "Software Engineer",
      "React Specialist",
      "UI/UX Creator",
      "API Architect",
    ],
    subtitle: "Turning ideas into digital solutions",
    viewProjects: "View Projects",
    contact: "Contact",
  },
  about: {
    title: "About Me",
    description:
      "I'm a developer passionate about creating incredible digital experiences. With expertise in various technologies, I turn ideas into functional and elegant products.",
    features: [
      {
        title: "Clean Code",
        description: "Clean, organized code following best practices",
      },
      {
        title: "Full Stack",
        description: "Experience in both frontend and backend",
      },
      {
        title: "UI/UX Design",
        description: "Modern interfaces and intuitive experiences",
      },
      {
        title: "Performance",
        description: "Fast and optimized applications",
      },
    ],
  },
  projects: {
    title: "Projects",
    items: [
      {
        title: "E-commerce Platform",
        description:
          "Complete e-commerce platform with admin panel, payment processing and inventory management.",
      },
      {
        title: "Dashboard Analytics",
        description:
          "Interactive dashboard for real-time data visualization with customizable charts and metrics.",
      },
      {
        title: "Social Media App",
        description:
          "Social networking app with personalized feed, stories, messaging and real-time notifications.",
      },
      {
        title: "AI Chat Assistant",
        description:
          "Intelligent virtual assistant with natural language processing and integration with multiple APIs.",
      },
    ],
  },
  skills: {
    title: "Skills",
    categories: ["Frontend", "Backend", "DevOps & Tools"],
  },
  contact: {
    title: "Get In Touch",
    subtitle: "Let's work together on your next project",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "your@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Your message...",
    send: "Send Message",
    connect: "Connect With Me",
    connectDesc:
      "Follow me on social media to keep up with my projects and development news.",
    footer: "© 2026 Full Stack Developer. All rights reserved.",
  },
};

export const translations: Record<Language, AppTranslations> = { "pt-BR": ptBR, en };

interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: AppTranslations;
}

const AppContext = createContext<AppContextType>({
  theme: "dark",
  toggleTheme: () => {},
  isDark: true,
  language: "pt-BR",
  setLanguage: () => {},
  t: ptBR,
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguage] = useState<Language>("pt-BR");

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("portfolio-theme");
      const savedLang = localStorage.getItem("portfolio-lang");
      if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme);
      }
      if (savedLang === "pt-BR" || savedLang === "en") {
        setLanguage(savedLang);
      }
    } catch (_) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch (_) {
      // ignore
    }
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-lang", language);
    } catch (_) {
      // ignore
    }
  }, [language]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        isDark: theme === "dark",
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  return useContext(AppContext);
}
