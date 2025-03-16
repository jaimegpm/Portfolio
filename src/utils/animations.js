/**
 * Utilidades para animaciones
 * Funciones para manejar animaciones en los componentes
 */

/**
 * Configura un observador de intersección para animar elementos cuando entran en el viewport
 * @param {Array} elements - Elementos a animar
 * @param {Object} options - Opciones para el observador
 * @param {Function} callback - Función a ejecutar cuando un elemento es visible
 * @returns {IntersectionObserver} - El observador creado
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
          // Comportamiento por defecto: añadir clase de animación
          entry.target.classList.add('animate-fade-in');
          entry.target.style.opacity = '1';
        }
        observer.unobserve(entry.target);
      }
    });
  }, defaultOptions);

  // Si elements es un array, observar cada elemento
  if (Array.isArray(elements)) {
    elements.forEach(element => {
      if (element) observer.observe(element);
    });
  } 
  // Si elements es un solo elemento, observarlo
  else if (elements) {
    observer.observe(elements);
  }

  return observer;
};

/**
 * Anima elementos con un retraso escalonado
 * @param {HTMLElement} container - Contenedor de los elementos a animar
 * @param {string} selector - Selector CSS para encontrar los elementos
 * @param {string} animationClass - Clase CSS de animación a añadir
 * @param {number} delay - Retraso entre animaciones en ms
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
 * Anima elementos inmediatamente al cargar la página
 * @param {Array} elements - Elementos a animar
 * @param {string} animationClass - Clase CSS de animación a añadir
 * @param {number} delay - Retraso antes de la animación en ms
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