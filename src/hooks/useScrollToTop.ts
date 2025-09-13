import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../utils/performance';

/**
 * Custom hook that scrolls to the top of the page whenever the route changes
 * @param behavior - The scroll behavior ('smooth' | 'instant' | 'auto')
 * @param delay - Optional delay in milliseconds before scrolling
 * @param excludeHash - Whether to exclude hash-based navigation from scroll-to-top
 */
export const useScrollToTop = (
  behavior: ScrollBehavior = 'instant',
  delay: number = 0,
  excludeHash: boolean = true
) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Don't scroll to top for hash-based navigation if excludeHash is true
    if (excludeHash && hash) {
      return;
    }

    const scrollToTopWithDelay = () => {
      if (delay > 0) {
        setTimeout(() => scrollToTop(behavior), delay);
      } else {
        scrollToTop(behavior);
      }
    };

    scrollToTopWithDelay();
  }, [pathname, hash, behavior, delay, excludeHash]);
};

export default useScrollToTop;
