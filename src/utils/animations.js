/**
 * Animation utilities
 * Functions to handle animations in components
 */

/**
 * Sets up an intersection observer to animate elements when they enter the viewport
 * @param {Array} elements - Elements to animate
 * @param {Object} options - Observer options
 * @param {Function} callback - Function to execute when element is visible
 * @returns {IntersectionObserver} - The created observer
 */
export const setupIntersectionObserver = (elements, options = {}, callback) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (callback) {
          callback(entry.target);
        } else {
          // Default behavior: add animation class
          entry.target.classList.add('animate-fade-in');
          entry.target.style.opacity = '1';
        }
        observer.unobserve(entry.target);
      }
    });
  }, defaultOptions);

  if (Array.isArray(elements)) {
    elements.forEach(element => {
      if (element) observer.observe(element);
    });
  } 
  else if (elements) {
    observer.observe(elements);
  }

  return observer;
};

/**
 * Animates elements with a staggered delay
 * @param {HTMLElement} container - Container of elements to animate
 * @param {string} selector - CSS selector to find elements
 * @param {string} animationClass - CSS animation class to add
 * @param {number} delay - Delay between animations in ms
 */
export const animateElementsWithDelay = (container, selector, animationClass, delay = 150) => {
  if (!container) return;
  
  const elements = container.querySelectorAll(selector);
  elements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(animationClass);
      element.style.opacity = '1';
    }, delay * index);
  });
};

/**
 * Animates elements immediately on page load
 * @param {Array} elements - Elements to animate
 * @param {string} animationClass - CSS animation class to add
 * @param {number} delay - Delay before animation in ms
 */
export const animateOnLoad = (elements, animationClass, delay = 0) => {
  if (Array.isArray(elements)) {
    elements.forEach((element, index) => {
      if (element) {
        setTimeout(() => {
          element.classList.add(animationClass);
          element.style.opacity = '1';
        }, delay * index);
      }
    });
  } else if (elements) {
    setTimeout(() => {
      elements.classList.add(animationClass);
      elements.style.opacity = '1';
    }, delay);
  }
};

export default {
  setupIntersectionObserver,
  animateElementsWithDelay,
  animateOnLoad
}; 