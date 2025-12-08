import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import AyrtonImg from '../assets/Ayrton.png';

export function About() {
  const { t } = useLanguage();
  const [displayedText, setDisplayedText] = useState('');
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteCount, setDeleteCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const fullText = `${t('about.p1')}\n\n${t('about.p2')}\n\n${t('about.p3')}\n\n${t('about.p4')}`;

  // Words to "mistype" - these will be intentionally typed wrong then corrected
  const mistakeWords = ['Ayrton', 'Computação', 'UFF', 'Junior', 'ICTI', 'Computer', 'Science'];

  useEffect(() => {
    // Reset animation when language changes
    setDisplayedText('');
    setCurrentChar(0);
    setIsDeleting(false);
    setDeleteCount(0);
    setIsComplete(false);
  }, [fullText]);

  useEffect(() => {
    if (currentChar >= fullText.length && !isDeleting) {
      setIsComplete(true);
      return;
    }

    // Check if we should make a mistake
    const shouldMakeMistake = () => {
      for (const word of mistakeWords) {
        const wordStart = fullText.indexOf(word, currentChar);
        if (wordStart === currentChar && Math.random() > 0.4) {
          return true;
        }
      }
      return false;
    };

    if (isDeleting) {
      // Delete characters
      if (deleteCount > 0) {
        const timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, currentChar - deleteCount));
          setDeleteCount(deleteCount - 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
      }
    } else if (currentChar < fullText.length) {
      // Type characters
      const timer = setTimeout(() => {
        // Random chance to make a typo on certain words
        if (shouldMakeMistake() && deleteCount === 0) {
          const wrongChars = ['x', 'z', 'k'];
          const wrongChar = wrongChars[Math.floor(Math.random() * wrongChars.length)];
          const mistakeLength = 2 + Math.floor(Math.random() * 2);
          
          setDisplayedText(fullText.slice(0, currentChar) + wrongChar.repeat(mistakeLength));
          setDeleteCount(mistakeLength);
          setIsDeleting(true);
        } else {
          setDisplayedText(fullText.slice(0, currentChar + 1));
          setCurrentChar(currentChar + 1);
        }
      }, 15);

      return () => clearTimeout(timer);
    }
  }, [currentChar, fullText, isDeleting, deleteCount]);

  // Split text into paragraphs for display
  const paragraphs = displayedText.split('\n\n');

  return (
    <section id="sobre" className="pt-32 pb-20 dark:bg-slate-800/30 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="order-2 md:order-1">
            <h2 className="dark:text-blue-400 text-blue-600 mb-4">
              {t('about.title')}
            </h2>
            
            {paragraphs.map((para, index) => (
              <p 
                key={index} 
                className="dark:text-slate-300 text-slate-700 mb-4 leading-relaxed"
              >
                {para}
                {/* Show cursor only at the very end of all text */}
                {index === paragraphs.length - 1 && (
                  <span className="inline-block w-px h-5 dark:bg-white bg-black ml-1 animate-pulse"></span>
                )}
              </p>
            ))}
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="absolute inset-0 dark:bg-blue-500/20 bg-blue-500/10 rounded-lg blur-3xl"></div>
              <ImageWithFallback
                src={AyrtonImg}
                alt="Developer workspace"
                className="relative rounded-lg shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}