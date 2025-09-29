'use client';

import React from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui';
import { stringToColor } from '@/shared/lib';

interface Props {
  className?: string;
  name: string;
}

export const Profile: React.FC<Props> = ({ name }) => {
  //!ОПТИМИЗИРОВАТЬ
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const bgColor = stringToColor(name);

  return (
    <div className='ml-6 '>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className='h-11 w-11 cursor-pointer'>
            <AvatarImage src='Картинка' />
            <AvatarFallback style={{ backgroundColor: bgColor }} className='text-white'>
              {initials}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align='end' className='px-6 text-right'>
          <span className='cursor-pointer '>Выход</span>
        </PopoverContent>
      </Popover>
    </div>
  );
};
