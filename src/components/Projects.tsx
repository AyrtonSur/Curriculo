import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

export function Projects() {
  const { t } = useLanguage();
  const swiperRef = useRef<SwiperType | null>(null);

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
          {/* Custom Navigation Buttons */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all hover:scale-110 shadow-lg -ml-6 hidden md:flex items-center justify-center"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all hover:scale-110 shadow-lg -mr-6 hidden md:flex items-center justify-center"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            loopAdditionalSlides={2}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                loop: true,
              },
              768: {
                slidesPerView: 2,
                loop: true,
              },
              1024: {
                slidesPerView: 3,
                loop: true,
              },
            }}
            className="projects-swiper pb-12"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="dark:bg-slate-800/50 bg-white backdrop-blur-sm rounded-lg overflow-hidden border dark:border-slate-700/50 border-slate-200 hover:border-blue-500/50 transition-all group shadow-lg hover:shadow-xl h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-video flex-shrink-0">
                    <ImageWithFallback
                      src={project.image}
                      alt={t(project.titleKey)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t dark:from-slate-900 from-white/80 to-transparent opacity-60"></div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="dark:text-white text-slate-900 mb-2">
                      {t(project.titleKey)}
                    </h3>
                    
                    <p className="dark:text-slate-400 text-slate-600 mb-4 leading-relaxed flex-grow">
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
                    
                    <div className="flex gap-4 mt-auto">
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
                        className="flex items-center gap-2 dark:text-slate-slate-300 text-slate-600 dark:hover:text-blue-400 hover:text-blue-600 transition-all hover:gap-3 duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t('projects.demo')}
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}