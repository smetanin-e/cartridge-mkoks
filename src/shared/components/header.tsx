'use client';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/shared/components/ui';
import { Download, Package, Repeat } from 'lucide-react';
import { Profile } from './profile';
import { Logo } from './logo';
import { useUserStore } from '../store/user';
import { useAgentStore } from '../store/agents';
import { UserRole } from '@prisma/client';

interface Props {
  className?: string;
  title: string;
  description: string;
}

export const Header: React.FC<Props> = ({ title, description }) => {
  const user = useUserStore((state) => state.user);
  const getAgents = useAgentStore((state) => state.getAgents);
  const initUser = useUserStore((state) => state.initUser);
  console.log(user);

  React.useEffect(() => {
    initUser();

    getAgents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='flex items-center justify-between mb-8'>
      <div className='flex items-center gap-4'>
        <Link href={'/replacement'}>
          <Logo width={60} height={60} />
        </Link>
        <div className='flex-1'>
          <h1 className='text-3xl font-bold'>{title}</h1>
          <p className='text-muted-foreground'>{description}</p>
        </div>
      </div>
      <div className='flex gap-2 items-center'>
        <Link href='/replacement'>
          <Button variant='outline' className='flex items-center gap-2'>
            <Repeat className='h-4 w-4' />
            Замена
          </Button>
        </Link>
        <Link href='/service-batch'>
          <Button variant='outline' className='flex items-center gap-2'>
            <Package className='h-4 w-4' />
            Отправка в сервис
          </Button>
        </Link>
        <Link href='/service-return'>
          <Button variant='outline' className='flex items-center gap-2'>
            <Download className='h-4 w-4' />
            Прием из сервиса
          </Button>
        </Link>
        <Link href='/cartridges'>
          <Button variant='outline' className='flex items-center gap-2'>
            Картриджи
          </Button>
        </Link>
        {user && <Profile user={user} />}
      </div>
    </div>
  );
};
