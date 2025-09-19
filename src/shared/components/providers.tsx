'use client';
import NextTopLoader from 'nextjs-toploader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Toaster } from 'react-hot-toast';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const color = 'var(--color-primary)';

  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <NextTopLoader color={color} shadow={`0 0 10px ${color},0 0 5px ${color}`} />
      <Toaster />
    </QueryClientProvider>
  );
};
