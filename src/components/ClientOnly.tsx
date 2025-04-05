import { useHasMounted } from '../hooks/useHasMounted';
import React from 'react';

type ClientOnlyProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export const ClientOnly: React.FC<ClientOnlyProps> = ({ 
  children, 
  fallback = null 
}) => {
  const hasMounted = useHasMounted();
  
  if (!hasMounted) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};
