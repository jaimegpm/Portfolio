import { useState, useEffect } from 'react';

/**
 * ScrollProgressBar Component
 * Displays a progress bar at the top of the page that indicates 
 * how far the user has scrolled down the page
 */
const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / totalHeight) * 100;
      setScrollProgress(progress);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize on mount
    handleScroll();

    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className="scroll-progress-indicator" 
      style={{ width: `${scrollProgress}%` }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgressBar;