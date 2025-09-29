'use client';
import React from 'react';
import { Button } from './ui';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

interface Props {
  className?: string;
}

export const Theme: React.FC<Props> = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className='absolute right-6 top-4'>
      <Button
        variant={'outline'}
        size={'icon'}
        className='rounded-full'
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <Moon
          className='absolute w-10 h-10
                     transition-all duration-300
                     rotate-0 scale-100 opacity-100
                     dark:-rotate-90 dark:scale-0 dark:opacity-0'
        />
        <Sun
          className='absolute w-10 h-10
                     transition-all duration-300
                     rotate-90 scale-0 opacity-0
                     dark:rotate-0 dark:scale-100 dark:opacity-100'
        />
      </Button>
    </div>
  );
};
