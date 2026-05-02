import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Theme = "dark" | "light";
export type Language = "pt-BR" | "en";

export interface AppTranslations {
  nav: {
    home: string;
    about: string;
    projects: string;
    skills: string;
    contact: string;
  };
  hero: {
    title: string;
    roles: string[];
    subtitle: string;
    viewProjects: string;
    contact: string;
  };
  about: {
    title: string;
    description: string;
    features: { title: string; description: string }[];
  };
  projects: {
    title: string;
    items: { title: string; description: string }[];
    viewProject: string;
    moreSoon: string;
  };
  skills: {
    title: string;
    subtitle: string;
    categories: string[];
  };
  contact: {
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
  };
}

const ptBR: AppTranslations = {
  nav: { home: "Início", about: "Sobre", projects: "Projetos", skills: "Habilidades", contact: "Contato" },
  hero: {
    title: "Desenvolvedor Full Stack",
    roles: ["Desenvolvedor Full Stack", "Engenheiro de Software", "Especialista em React", "Arquiteto de APIs"],
    subtitle: "Transformando ideias em soluções digitais",
    viewProjects: "Ver Projetos",
    contact: "Contato",
  },
  about: {
    title: "Sobre Mim",
    description: "Sou um desenvolvedor apaixonado por criar experiências digitais incríveis. Com experiência em diversas tecnologias, transformo ideias em produtos funcionais e elegantes.",
    features: [
      { title: "Clean Code", description: "Código limpo, organizado e seguindo as melhores práticas" },
      { title: "Full Stack", description: "Experiência tanto em frontend quanto backend" },
      { title: "UI/UX Design", description: "Interfaces modernas e experiências intuitivas" },
      { title: "Performance", description: "Aplicações rápidas e otimizadas" },
    ],
  },
  projects: {
    title: "Projetos",
    items: [
      { title: "E-commerce Platform", description: "Plataforma completa de e-commerce com painel administrativo, processamento de pagamentos e gestão de inventário." },
      { title: "Dashboard Analytics", description: "Dashboard interativo para visualização de dados em tempo real com gráficos e métricas customizáveis." },
      { title: "Social Media App", description: "Aplicativo de rede social com feed personalizado, stories, mensagens e notificações em tempo real." },
      { title: "AI Chat Assistant", description: "Assistente virtual inteligente com processamento de linguagem natural e integração com múltiplas APIs." },
    ],
    viewProject: "Ver projeto",
    moreSoon: "Em breve",
  },
  skills: { title: "Habilidades", subtitle: "Minhas competências técnicas", categories: ["Frontend", "Backend", "DevOps & Tools"] },
  contact: {
    title: "Entre em Contato",
    subtitle: "Vamos trabalhar juntos no seu próximo projeto",
    nameLabel: "Nome", namePlaceholder: "Seu nome",
    emailLabel: "Email", emailPlaceholder: "seu@email.com",
    messageLabel: "Mensagem", messagePlaceholder: "Sua mensagem...",
    send: "Enviar Mensagem",
    connect: "Conecte-se Comigo",
    connectDesc: "Siga-me nas redes sociais para acompanhar meus projetos e novidades da área de desenvolvimento.",
    footer: "© 2026 Desenvolvedor Full Stack. Todos os direitos reservados.",
  },
};

const enUS: AppTranslations = {
  nav: { home: "Home", about: "About", projects: "Projects", skills: "Skills", contact: "Contact" },
  hero: {
    title: "Full Stack Developer",
    roles: ["Full Stack Developer", "Software Engineer", "React Specialist", "API Architect"],
    subtitle: "Turning ideas into digital solutions",
    viewProjects: "View Projects",
    contact: "Contact",
  },
  about: {
    title: "About Me",
    description: "I'm a developer passionate about creating incredible digital experiences. With expertise in various technologies, I turn ideas into functional and elegant products.",
    features: [
      { title: "Clean Code", description: "Clean, organized code following best practices" },
      { title: "Full Stack", description: "Experience in both frontend and backend" },
      { title: "UI/UX Design", description: "Modern interfaces and intuitive experiences" },
      { title: "Performance", description: "Fast and optimized applications" },
    ],
  },
  projects: {
    title: "Projects",
    items: [
      { title: "E-commerce Platform", description: "Complete e-commerce platform with admin panel, payment processing and inventory management." },
      { title: "Dashboard Analytics", description: "Interactive dashboard for real-time data visualization with customizable charts and metrics." },
      { title: "Social Media App", description: "Social networking app with personalized feed, stories, messaging and real-time notifications." },
      { title: "AI Chat Assistant", description: "Intelligent virtual assistant with natural language processing and integration with multiple APIs." },
    ],
    viewProject: "View project",
    moreSoon: "More coming soon",
  },
  skills: { title: "Skills", subtitle: "My technical competencies", categories: ["Frontend", "Backend", "DevOps & Tools"] },
  contact: {
    title: "Get In Touch",
    subtitle: "Let's work together on your next project",
    nameLabel: "Name", namePlaceholder: "Your name",
    emailLabel: "Email", emailPlaceholder: "your@email.com",
    messageLabel: "Message", messagePlaceholder: "Your message...",
    send: "Send Message",
    connect: "Connect With Me",
    connectDesc: "Follow me on social media to keep up with my projects and development news.",
    footer: "© 2026 Full Stack Developer. All rights reserved.",
  },
};

export const TRANSLATIONS: Record<Language, AppTranslations> = { "pt-BR": ptBR, en: enUS };

export interface AppState {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: AppTranslations;
}

const Ctx = createContext<AppState>({
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
      const t = localStorage.getItem("pf-theme");
      const l = localStorage.getItem("pf-lang");
      if (t === "dark" || t === "light") setTheme(t);
      if (l === "pt-BR" || l === "en") setLanguage(l);
    } catch (_) {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("pf-theme", theme); } catch (_) {}
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    try { localStorage.setItem("pf-lang", language); } catch (_) {}
  }, [language]);

  return (
    <Ctx.Provider value={{
      theme,
      toggleTheme: () => setTheme(p => p === "dark" ? "light" : "dark"),
      isDark: theme === "dark",
      language,
      setLanguage,
      t: TRANSLATIONS[language],
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp(): AppState {
  return useContext(Ctx);
}