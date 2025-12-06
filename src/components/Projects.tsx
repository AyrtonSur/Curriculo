import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';

export function Projects() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const projects = [
    {
      titleKey: 'projects.p1.title',
      descKey: 'projects.p1.desc',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    {
      titleKey: 'projects.p2.title',
      descKey: 'projects.p2.desc',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      tags: ['Next.js', 'TypeScript', 'Recharts', 'Tailwind'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    {
      titleKey: 'projects.p3.title',
      descKey: 'projects.p3.desc',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      tags: ['React', 'Firebase', 'Tailwind CSS', 'PWA'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    {
      titleKey: 'projects.p4.title',
      descKey: 'projects.p4.desc',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      tags: ['Next.js', 'MongoDB', 'Socket.io', 'AWS'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    {
      titleKey: 'projects.p5.title',
      descKey: 'projects.p5.desc',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      tags: ['Python', 'React', 'OpenAI', 'FastAPI'],
      github: 'https://github.com',
      demo: 'https://example.com'
    },
    {
      titleKey: 'projects.p6.title',
      descKey: 'projects.p6.desc',
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80',
      tags: ['React Native', 'Node.js', 'MongoDB', 'Redux'],
      github: 'https://github.com',
      demo: 'https://example.com'
    }
  ];

  const maxIndex = Math.max(0, projects.length - slidesToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section id="projetos" className="py-20 dark:bg-slate-900/50 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="dark:text-blue-400 text-blue-600 mb-4">
            {t('projects.title')}
          </h2>
          <p className="dark:text-slate-400 text-slate-600 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all hover:scale-110 shadow-lg -ml-6 hidden md:block"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all hover:scale-110 shadow-lg -mr-6 hidden md:block"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden mx-auto" style={{ maxWidth: slidesToShow === 1 ? 'calc(100% - 3rem)' : '100%' }}>
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                paddingLeft: slidesToShow > 1 ? '3rem' : '0',
                paddingRight: slidesToShow > 1 ? '3rem' : '0'
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0"
                  style={{ 
                    width: slidesToShow === 1 
                      ? '100%' 
                      : `calc(${100 / slidesToShow}% - ${24 * (slidesToShow - 1) / slidesToShow}px)`
                  }}
                >
                  <div className="dark:bg-slate-800/50 bg-white backdrop-blur-sm rounded-lg overflow-hidden border dark:border-slate-700/50 border-slate-200 hover:border-blue-500/50 transition-all group h-full shadow-lg hover:shadow-xl">
                    <div className="relative overflow-hidden aspect-video">
                      <ImageWithFallback
                        src={project.image}
                        alt={t(project.titleKey)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t dark:from-slate-900 from-white/80 to-transparent opacity-60"></div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="dark:text-white text-slate-900 mb-2">
                        {t(project.titleKey)}
                      </h3>
                      
                      <p className="dark:text-slate-400 text-slate-600 mb-4 leading-relaxed">
                        {t(project.descKey)}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="dark:bg-blue-500/10 bg-blue-50 dark:text-blue-300 text-blue-700 px-3 py-1 rounded-full border dark:border-blue-500/20 border-blue-200 dark:hover:bg-blue-500/20 hover:bg-blue-100 hover:scale-105 transition-all duration-200 cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex gap-4">
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 dark:text-slate-300 text-slate-600 dark:hover:text-blue-400 hover:text-blue-600 transition-all hover:gap-3 duration-200"
                        >
                          <Github className="w-4 h-4" />
                          {t('projects.code')}
                        </a>
                        <a 
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 dark:text-slate-300 text-slate-600 dark:hover:text-blue-400 hover:text-blue-600 transition-all hover:gap-3 duration-200"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t('projects.demo')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  currentIndex === index 
                    ? 'bg-blue-500 dark:bg-blue-500 bg-blue-600 w-8' 
                    : 'bg-slate-400 dark:bg-slate-600 bg-slate-300 hover:bg-blue-400 dark:hover:bg-blue-400 hover:bg-blue-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}