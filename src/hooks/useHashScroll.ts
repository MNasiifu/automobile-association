import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook for handling hash-based scrolling within the same page
 * @param offset - Additional offset from the top when scrolling to element (default: 80px for fixed navbar)
 * @param behavior - Scroll behavior ('smooth' | 'instant' | 'auto')
 */
export const useHashScroll = (
  offset: number = 80,
  behavior: ScrollBehavior = 'smooth'
) => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.replace('#', '');
    if (!hash) return;

    // Wait for the DOM to be ready
    const timer = setTimeout(() => {
      const element = document.getElementById(decodeURIComponent(hash));
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - offset,
          behavior,
        });
      }
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash, offset, behavior]);
};

export default useHashScroll;
