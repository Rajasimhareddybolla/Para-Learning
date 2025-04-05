import React from 'react';
import { useHasMounted } from '@/hooks/useHasMounted';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * A component that only renders its children on the client-side.
 * Useful for preventing hydration mismatches with components that use browser APIs.
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const hasMounted = useHasMounted();
  
  if (!hasMounted) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}
