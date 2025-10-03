import { Button } from '@/shared/components/ui';
import Link from 'next/link';
import React from 'react';
import { Logo } from '@/shared/components';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-foreground-50 p-6'>
      <Logo width={200} height={200} />
      <h1 className='text-5xl font-bold mb-4 text-center mt-8'>
        Добро пожаловать в сервис управления картриджами
      </h1>

      <p className='text-lg text-gray-600 mb-8 text-center max-w-xl'>
        Фиксация замены картриджей, подготовка партий для отправки в сервис, прием партий из
        сервиса, реестр картриджей, управление состоянием картриджей.
      </p>

      <Link href={'/replacement'}>
        <Button>Войти</Button>
      </Link>

      <footer className='mt-20 text-gray-500 text-sm'>&copy; 2025 г. Все права защищены.</footer>
    </div>
  );
}
