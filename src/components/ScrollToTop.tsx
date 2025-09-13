import React from 'react';
import { useScrollToTop } from '../hooks/useScrollToTop';

interface ScrollToTopProps {
  behavior?: ScrollBehavior;
  delay?: number;
  excludeHash?: boolean;
}

/**
 * ScrollToTop Component
 * Automatically scrolls to the top of the page when the route changes.
 * This component doesn't render anything visually - it only handles the scroll behavior.
 */
const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  behavior = 'instant', 
  delay = 0, 
  excludeHash = true 
}) => {
  useScrollToTop(behavior, delay, excludeHash);
  return null;
};

export default ScrollToTop;
