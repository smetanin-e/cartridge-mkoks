import { cn } from '@/shared/lib';
import { Eye, EyeOff, X } from 'lucide-react';
import React from 'react';

interface Props {
  className?: string;
  onClick?: VoidFunction;
  showPassword: boolean;
}

export const ShowPassword: React.FC<Props> = ({ onClick, className, showPassword }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer',
        className,
      )}
    >
      {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
    </button>
  );
};
