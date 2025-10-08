'use client';
import React from 'react';
import {
  Avatar,
  AvatarFallback,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui';
import { stringToColor, userInitials } from '@/shared/lib';
import { signOut } from '../services/auth/sign-out';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { AuthUser } from '@/@types/user.type';

interface Props {
  className?: string;
  user: AuthUser;
}

export const Profile: React.FC<Props> = ({ user }) => {
  const name = `${user?.surname} ${user?.firstName} ${user?.lastName}`;
  const initials = userInitials(name);
  const bgColor = stringToColor(name);
  const router = useRouter();
  const logout = async () => {
    await signOut();
    router.push('/');
    toast.success('Вы вышли из аккаунта');
  };

  return (
    <div className='ml-6 '>
      <Popover>
        <PopoverTrigger asChild>
          <Avatar className='h-11 w-11 cursor-pointer'>
            <AvatarFallback style={{ backgroundColor: bgColor }} className='text-white'>
              {initials}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align='end' className='px-6 text-right'>
          {user.role === 'ADMIN' && (
            <p className='mb-4 cursor-pointer'>
              <Link href={'/admin'}>Администрирование</Link>
            </p>
          )}

          <p className='cursor-pointer ' onClick={logout}>
            Выход
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
};
