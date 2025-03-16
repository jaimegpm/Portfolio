import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';

/**
 * Layout Component
 * Main structure of the application containing Header and Footer
 * Following BEM methodology for classes
 */
const Layout = ({ children }) => {
  // Effect to ensure scroll starts from the top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add intersection observer for scroll animations
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
    
    // Observe all sections to animate them when entering viewport
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="layout flex flex-col min-h-screen bg-white dark:bg-background-dark text-text dark:text-text-dark">
      <Header />
      <main className="layout__main flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 