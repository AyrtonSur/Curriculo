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
    experience: {
      title: string;
      items: { company: string; role: string; period: string; url: string }[];
    };
    academic: {
      title: string;
      institution: string;
      fullName: string;
      course: string;
      period: string;
      url: string;
    };
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
    title: "Desenvolvedor Backend",
    roles: ["Desenvolvedor Backend", "Rails Developer", "Arquiteto de APIs", "Dev Full Stack"],
    subtitle: "Ruby on Rails, Node.js e arquitetura orientada a eventos — com domínio de React no frontend",
    viewProjects: "Ver Projetos",
    contact: "Contato",
  },
  about: {
    title: "Sobre Mim",
    description: "Sou um desenvolvedor backend especializado em Ruby on Rails, com experiência em Node.js (Fastify + Prisma) para sistemas de mensageria com Redis e BullMQ. Já trabalhei com Python para análise de dados e tenho vivência com sistemas distribuídos e arquitetura baseada em eventos. Também tenho domínio em React e TypeScript para entregar soluções completas quando necessário.",
    features: [
      { title: "Clean Code", description: "Código limpo, organizado e seguindo as melhores práticas" },
      { title: "APIs & Backend", description: "APIs RESTful com Ruby on Rails e Node.js (Fastify + Prisma), mensageria com Redis + BullMQ e sistemas distribuídos" },
      { title: "Banco de Dados", description: "PostgreSQL, modelagem de dados, otimização de queries e cache com Redis" },
      { title: "React & Frontend", description: "Interfaces modernas com React e TypeScript quando o projeto exige" },
    ],
    experience: {
      title: "Experiência",
      items: [
        { company: "Agendor", role: "Backend Developer", period: "2025 – presente", url: "https://www.agendor.com.br/" },
        { company: "IN Junior", role: "Backend Developer", period: "2023 – presente", url: "https://injunior.com.br" },
        { company: "ICTI · Itaú", role: "Iniciação Científica", period: "2024 – 2025", url: "https://www.icti.org.br/" },
      ],
    },
    academic: {
      title: "Formação",
      institution: "UFF",
      fullName: "Universidade Federal Fluminense",
      course: "Ciência da Computação",
      period: "2023 – presente",
      url: "https://www.uff.br/",
    },
  },
  projects: {
    title: "Projetos",
    items: [
      { title: "Rofnein", description: "Um jogo roguelike 2D desenvolvido em Python com Pygame. Projeto de avaliação da disciplina Laboratório de Programação de Jogos, ministrada pelo professor Esteban Walter Gonzalez Clua." },
      { title: "Dashboard Streamlit", description: "Dashboard interativo desenvolvido com Streamlit para análise do processo seletivo da empresa IN Junior. O projeto teve como objetivo identificar gargalos e visualizar métricas-chave ao longo das etapas do processo, combinando análises estatísticas com visualizações dinâmicas." },
      { title: "Social Media App", description: "Aplicativo de rede social com feed personalizado, stories, mensagens e notificações em tempo real." },
      { title: "AI Chat Assistant", description: "Assistente virtual inteligente com processamento de linguagem natural e integração com múltiplas APIs." },
    ],
    viewProject: "Ver projeto",
    moreSoon: "Em breve",
  },
  skills: { title: "Habilidades", subtitle: "Minhas competências técnicas", categories: ["Backend", "Frontend", "DevOps & Tools"] },
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
    title: "Backend Developer",
    roles: ["Backend Developer", "Rails Developer", "API Architect", "Full Stack Dev"],
    subtitle: "Ruby on Rails, Node.js and event-driven architecture — with React expertise on the frontend",
    viewProjects: "View Projects",
    contact: "Contact",
  },
  about: {
    title: "About Me",
    description: "I'm a backend developer specialized in Ruby on Rails, with experience in Node.js (Fastify + Prisma) for messaging systems using Redis and BullMQ. I have worked with Python for data analysis and have a background in distributed systems and event-driven architecture. I also have strong command of React and TypeScript to deliver complete solutions when needed.",
    features: [
      { title: "Clean Code", description: "Clean, organized code following best practices" },
      { title: "APIs & Backend", description: "RESTful APIs with Ruby on Rails and Node.js (Fastify + Prisma), messaging with Redis + BullMQ and distributed systems" },
      { title: "Databases", description: "PostgreSQL, data modeling, query optimization and caching with Redis" },
      { title: "React & Frontend", description: "Modern interfaces with React and TypeScript when the project demands" },
    ],
    experience: {
      title: "Experience",
      items: [
        { company: "Agendor", role: "Backend Developer", period: "2025 – present", url: "https://www.agendor.com.br/" },
        { company: "IN Junior", role: "Backend Developer", period: "2023 – present", url: "https://injunior.com.br" },
        { company: "ICTI · Itaú", role: "Scientific Initiation", period: "2024 – 2025", url: "https://www.icti.org.br/" },
      ],
    },
    academic: {
      title: "Education",
      institution: "UFF",
      fullName: "Universidade Federal Fluminense",
      course: "Computer Science",
      period: "2023 – present",
      url: "https://www.uff.br/",
    },
  },
  projects: {
    title: "Projects",
    items: [
      { title: "Rofnein", description: "A 2D roguelike game developed in Python with Pygame. Created as an evaluation project for the Game Programming Laboratory course, taught by professor Esteban Walter Gonzalez Clua." },
      { title: "Streamlit Dashboard", description: "Interactive dashboard built with Streamlit to analyze a recruitment process at IN Junior. The project aimed to identify bottlenecks and visualize key metrics across each stage of the process, combining statistical analysis with dynamic visualizations." },
      { title: "Social Media App", description: "Social networking app with personalized feed, stories, messaging and real-time notifications." },
      { title: "AI Chat Assistant", description: "Intelligent virtual assistant with natural language processing and integration with multiple APIs." },
    ],
    viewProject: "View project",
    moreSoon: "More coming soon",
  },
  skills: { title: "Skills", subtitle: "My technical competencies", categories: ["Backend", "Frontend", "DevOps & Tools"] },
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