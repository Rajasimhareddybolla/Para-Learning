import React from 'react';
import { ClientOnly } from './ClientOnly';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <ClientOnly>
      <div className={`flex min-h-screen w-full flex-col ${className}`}>
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-4xl">
            {children}
          </div>
        </main>
      </div>
    </ClientOnly>
  );
};

export const CenteredContent: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
};

export const Card: React.FC<LayoutProps> = ({ children, className = '' }) => {
  return (
    <div className={`rounded-lg border bg-card p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
};
