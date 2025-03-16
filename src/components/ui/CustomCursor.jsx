import { useState, useEffect, useRef } from 'react';

/**
 * CustomCursor Component
 * Creates a modern and minimalist custom cursor optimized for performance
 */
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  
  // Use refs to avoid unnecessary re-renders
  const positionRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef();
  const previousTimeRef = useRef();

  // Update cursor position
  const updateCursorPosition = () => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px) scale(${clicked ? 0.7 : 1})`;
    }
    requestRef.current = requestAnimationFrame(updateCursorPosition);
  };

  useEffect(() => {
    // Only show on non-touch devices
    const isTouchDevice = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    if (isTouchDevice()) return;

    const onMouseMove = (e) => {
      positionRef.current = { 
        x: e.clientX, 
        y: e.clientY 
      };
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      const isLink = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button');
      
      setLinkHovered(isLink);
    };

    // Start animation loop
    requestRef.current = requestAnimationFrame(updateCursorPosition);
    
    // Add event listeners
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseover', onMouseOver);
    
    // Add class to hide default cursor
    document.body.classList.add('custom-cursor-active');
    setHidden(false);

    return () => {
      // Cleanup event listeners and cancel animation
      cancelAnimationFrame(requestRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseover', onMouseOver);
      
      // Remove class to restore default cursor
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={cursorRef}
      className="cursor-modern"
      style={{ 
        width: linkHovered ? '36px' : '12px',
        height: linkHovered ? '36px' : '12px',
        backgroundColor: linkHovered ? 'transparent' : 'var(--color-primary)',
        border: linkHovered ? '2px solid var(--color-primary)' : 'none',
        opacity: linkHovered ? 0.9 : 0.7,
      }}
    />
  );
};

export default CustomCursor;