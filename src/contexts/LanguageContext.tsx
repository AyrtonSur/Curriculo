import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Header
    'header.title': 'Full Stack Developer',
    'header.subtitle': 'Transforming ideas into elegant and functional digital solutions',
    'header.contact': 'Contact',
    
    // About
    'about.title': 'About Me',
    'about.p1': "Hey, what's up? My name is Ayrton, I'm currently 21 years old and am studying Computer Science at UFF.",
    'about.p2': 'I am currently focusing on learning as much as I can and to do that I try to challenge myself in many ways. I have gained valuable experience working at IN Junior, a junior enterprise, where I developed my skills in software development. Additionally, I had a research scholarship working for ICTI in the field of AI applied to financial markets.',
    'about.p3': 'Throughout my journey, I have learned many different languages, like Python, Java, JavaScript, C, Go, etc. But my main language, right now, is TypeScript.',
    'about.p4': 'I work, mainly, on the backend side of projects, but I have the knowledge to work frontend too.',
    
    // Skills
    'skills.title': 'Skills & Technologies',
    'skills.subtitle': 'Tools and technologies I use to build robust and scalable solutions',
    'skills.frontend': 'Frontend',
    'skills.frontendDesc': 'Modern interfaces with focus on user experience and performance',
    'skills.backend': 'Backend',
    'skills.backendDesc': 'Robust APIs and efficient server-side logic',
    'skills.database': 'Database & Data',
    'skills.databaseDesc': 'Data management and processing solutions',
    'skills.tools': 'DevOps & Tools',
    'skills.toolsDesc': 'Development and deployment tools',
    
    // Projects
    'projects.title': 'Featured Projects',
    'projects.subtitle': "Some of the projects I've recently developed",
    'projects.code': 'Code',
    'projects.demo': 'Demo',
    'projects.p1.title': 'E-commerce Platform',
    'projects.p1.desc': 'Complete e-commerce platform with admin panel, payment integration and inventory management system.',
    'projects.p2.title': 'Dashboard Analytics',
    'projects.p2.desc': 'Interactive dashboard for real-time data visualization with customizable charts and metrics.',
    'projects.p3.title': 'Task Management App',
    'projects.p3.desc': 'Task management application with real-time collaboration and smart notifications.',
    'projects.p4.title': 'Social Media Platform',
    'projects.p4.desc': 'Modern social network with personalized feed, stories, direct messages and recommendation system.',
    'projects.p5.title': 'AI Content Generator',
    'projects.p5.desc': 'Content generation tool using artificial intelligence to create texts, images and suggestions.',
    'projects.p6.title': 'Fitness Tracking App',
    'projects.p6.desc': 'Exercise and nutrition tracking app with personalized plans and progress charts.',
    
    // Footer
    'footer.contact': 'Contact',
    'footer.quickLinks': 'Quick Links',
    'footer.about': 'About',
    'footer.description': 'Developer passionate about creating innovative and efficient digital solutions.',
    'footer.rights': 'All rights reserved',
  },
  pt: {
    // Navigation
    'nav.about': 'Sobre',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    
    // Header
    'header.title': 'Desenvolvedor Full Stack',
    'header.subtitle': 'Transformando ideias em soluções digitais elegantes e funcionais',
    'header.contact': 'Contato',
    
    // About
    'about.title': 'Sobre Mim',
    'about.p1': 'E aí, tudo bem? Meu nome é Ayrton, tenho 21 anos e estudo Ciência da Computação na UFF.',
    'about.p2': 'Atualmente estou focado em aprender o máximo que posso e para isso tento me desafiar de várias maneiras. Ganhei experiência valiosa trabalhando na IN Junior, uma empresa júnior, onde desenvolvi minhas habilidades em desenvolvimento de software. Além disso, tive uma bolsa de pesquisa trabalhando para o ICTI na área de IA aplicada ao mercado financeiro.',
    'about.p3': 'Ao longo da minha jornada, aprendi várias linguagens diferentes, como Python, Java, JavaScript, C, Go, etc. Mas minha linguagem principal, no momento, é TypeScript.',
    'about.p4': 'Trabalho, principalmente, no backend dos projetos, mas tenho conhecimento para trabalhar no frontend também.',
    
    // Skills
    'skills.title': 'Habilidades & Tecnologias',
    'skills.subtitle': 'Ferramentas e tecnologias que utilizo para criar soluções robustas e escaláveis',
    'skills.frontend': 'Frontend',
    'skills.frontendDesc': 'Interfaces modernas com foco em experiência do usuário e performance',
    'skills.backend': 'Backend',
    'skills.backendDesc': 'APIs robustas e lógica eficiente no servidor',
    'skills.database': 'Banco de Dados & Dados',
    'skills.databaseDesc': 'Soluções de gerenciamento e processamento de dados',
    'skills.tools': 'DevOps & Ferramentas',
    'skills.toolsDesc': 'Ferramentas de desenvolvimento e deploy',
    
    // Projects
    'projects.title': 'Projetos em Destaque',
    'projects.subtitle': 'Alguns dos projetos que desenvolvi recentemente',
    'projects.code': 'Código',
    'projects.demo': 'Demo',
    'projects.p1.title': 'Plataforma E-commerce',
    'projects.p1.desc': 'Plataforma completa de e-commerce com painel administrativo, integração de pagamentos e sistema de gestão de estoque.',
    'projects.p2.title': 'Dashboard Analytics',
    'projects.p2.desc': 'Dashboard interativo para visualização de dados em tempo real com gráficos e métricas personalizáveis.',
    'projects.p3.title': 'App de Gerenciamento de Tarefas',
    'projects.p3.desc': 'Aplicativo de gerenciamento de tarefas com colaboração em tempo real e notificações inteligentes.',
    'projects.p4.title': 'Plataforma de Rede Social',
    'projects.p4.desc': 'Rede social moderna com feed personalizado, stories, mensagens diretas e sistema de recomendação.',
    'projects.p5.title': 'Gerador de Conteúdo com IA',
    'projects.p5.desc': 'Ferramenta de geração de conteúdo usando inteligência artificial para criar textos, imagens e sugestões.',
    'projects.p6.title': 'App de Acompanhamento Fitness',
    'projects.p6.desc': 'Aplicativo de acompanhamento de exercícios e nutrição com planos personalizados e gráficos de progresso.',
    
    // Footer
    'footer.contact': 'Contato',
    'footer.quickLinks': 'Links Rápidos',
    'footer.about': 'Sobre',
    'footer.description': 'Desenvolvedor apaixonado por criar soluções digitais inovadoras e eficientes.',
    'footer.rights': 'Todos os direitos reservados',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'pt' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}