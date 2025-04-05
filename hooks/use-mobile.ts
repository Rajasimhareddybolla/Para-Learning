import { useState, useEffect } from 'react';

export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [breakpoint]);

  return isMobile;
}

// Create an alias for consistency
export const useIsMobile = useMobile;
