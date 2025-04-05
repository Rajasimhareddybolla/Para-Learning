import { useEffect, useState } from 'react';

/**
 * A hook that returns whether the component has mounted on the client.
 * Use this to safely render components that need browser APIs.
 */
export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  return hasMounted;
};
