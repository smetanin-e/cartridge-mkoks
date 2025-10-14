'use client';
import NextTopLoader from 'nextjs-toploader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'next-themes';
import { Theme } from './theme';
import { refreshAccessToken } from '../services/auth/refresh-access-token';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const color = 'var(--color-primary)';

  const [queryClient] = React.useState(() => new QueryClient());
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    refreshAccessToken();
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute={'class'} enableSystem defaultTheme='system'>
        {children}
        <Theme />
      </ThemeProvider>

      <NextTopLoader color={color} shadow={`0 0 10px ${color},0 0 5px ${color}`} />
      <Toaster />
    </QueryClientProvider>
  );
};
