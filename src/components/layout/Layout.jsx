import Header from './Header';
import Footer from './Footer';
import ScrollProgressBar from '../ui/ScrollProgressBar';
import CustomCursor from '../ui/CustomCursor';
import { useEffect } from 'react';

/**
 * Layout Component
 * Main structure of the application containing Header and Footer
 */
const Layout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Configure intersection observer for fade-in animations
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
    
    // Configure scroll reveal animations
    const scrollRevealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-zoom').forEach(el => {
      scrollRevealObserver.observe(el);
    });
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
      if (scrollRevealObserver) {
        scrollRevealObserver.disconnect();
      }
    };
  }, []);

  return (
    <div className="layout flex flex-col min-h-screen bg-white dark:bg-background-dark text-text dark:text-text-dark">
      <ScrollProgressBar />
      <CustomCursor />
      <Header />
      <main className="layout__main flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;