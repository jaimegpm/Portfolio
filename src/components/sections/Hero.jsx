import { useEffect, useRef, useState } from 'react';
import { profileImages } from '../../data/placeholderImages';
import { animateOnLoad } from '../../utils/animations';

/**
 * Main hero section component with animations
 */
const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const [hideScrollIndicator, setHideScrollIndicator] = useState(false);

  // Handle initial load animations
  useEffect(() => {
    const elements = [titleRef.current, subtitleRef.current, ctaRef.current, imageRef.current];
    elements.forEach(el => {
      if (el) {
        el.style.opacity = '0';
      }
    });

    const timer = setTimeout(() => {
      animateOnLoad(titleRef.current, 'animate-slide-up');
      
      setTimeout(() => {
        animateOnLoad(subtitleRef.current, 'animate-slide-up');
      }, 200);
      
      setTimeout(() => {
        animateOnLoad(ctaRef.current, 'animate-slide-up');
      }, 400);
      
      setTimeout(() => {
        animateOnLoad(imageRef.current, 'animate-slide-left');
      }, 300);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Control scroll indicator visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.1) {
        setHideScrollIndicator(true);
      } else {
        setHideScrollIndicator(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="home" className="hero min-h-screen flex items-center bg-gradient-to-b from-white to-gray-50 dark:from-background-dark dark:to-gray-900 overflow-hidden">
      <div className="hero__container container mx-auto px-4 md:px-6">
        <div className="hero__content grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Main content section */}
          <div className="hero__text order-2 md:order-1">
            <h1 
              ref={titleRef}
              className="hero__title text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{ opacity: 0 }}
            >
              <span className="block text-gray-900 dark:text-white">Hello, I'm</span>
              <span className="hero__name bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Jaime García-Page</span>
            </h1>
            <h2 
              ref={subtitleRef}
              className="hero__subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8"
              style={{ opacity: 0 }}
            >
              <span className="hero__role block font-medium">Full Stack Web Developer</span>
              <span className="hero__tagline block mt-2">Creating attractive and functional digital experiences</span>
            </h2>
            <div 
              ref={ctaRef}
              className="hero__cta flex flex-wrap gap-4"
              style={{ opacity: 0 }}
            >
              <a 
                href="#contact" 
                className="hero__button hero__button--primary px-8 py-3 bg-primary hover:bg-primary-dark text-white hover:text-white dark:text-white dark:hover:text-white font-medium rounded-md transition-colors shadow-md hover:shadow-lg"
              >
                Contact Me
              </a>
              <a 
                href="#projects" 
                className="hero__button hero__button--secondary px-8 py-3 bg-white dark:bg-gray-800 text-primary dark:text-primary-light border border-primary dark:border-primary-light font-medium rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
              >
                View Projects
              </a>
            </div>
            
            {/* Technology expertise section */}
            <div className="hero__stats grid grid-cols-3 gap-3 sm:gap-6 mt-8 md:mt-12">
              {[
                { value: 'React', label: 'Frontend' },
                { value: 'Java', label: 'Backend' },
                { value: 'Tailwind', label: 'Styling' },
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="hero__stat text-center p-2 sm:p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="hero__stat-value block text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <span className="hero__stat-label text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Profile image with decorative elements */}
          <div 
            ref={imageRef}
            className="hero__image-container relative order-1 md:order-2 flex justify-center mb-8 md:mb-0"
            style={{ opacity: 0 }}
          >
            <div className="hero__image-wrapper relative z-10 w-48 h-48 sm:w-64 sm:h-64 md:w-auto md:h-auto max-w-full">
              <div className="hero__image-bg absolute -inset-4 bg-gradient-to-tr from-primary-light/20 to-secondary-light/20 dark:from-primary-dark/20 dark:to-secondary-dark/20 rounded-full blur-xl"></div>
              <div className="hero__image aspect-square rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl relative z-10">
                <img 
                  src={profileImages.avatar2} 
                  alt="Profile photo" 
                  className="hero__img w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Background decorations */}
            <div className="hero__decoration-1 absolute top-1/4 -left-4 sm:-left-8 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-accent/30 rounded-full blur-md animate-pulse"></div>
            <div className="hero__decoration-2 absolute bottom-1/4 -right-4 sm:-right-8 w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-primary/30 rounded-full blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="hero__decoration-3 absolute -bottom-4 sm:-bottom-8 left-1/3 w-8 h-8 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-secondary/30 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            {/* Floating technology icons */}
            <div className="hero__tech hero__tech--1 absolute top-0 right-1/4 p-1.5 sm:p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg animate-bounce-slow">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </div>
            <div className="hero__tech hero__tech--2 absolute bottom-1/4 left-1/4 md:left-0 lg:left-0 p-1.5 sm:p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg animate-bounce-slow" style={{ animationDelay: '1s' }}>
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </div>
            <div className="hero__tech hero__tech--3 absolute bottom-0 right-1/4 p-1.5 sm:p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg animate-bounce-slow" style={{ animationDelay: '2s' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - Desktop only */}
      <div 
        ref={scrollIndicatorRef}
        className={`hero__scroll absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center animate-bounce-slow transition-opacity duration-500 ${
          hideScrollIndicator ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll</span>
        <svg className="w-6 h-6 text-primary dark:text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;