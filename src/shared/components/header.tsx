import Link from 'next/link';
import React from 'react';
import { Button } from '@/shared/components/ui';
import { Download, Package, Repeat } from 'lucide-react';
import { Profile } from './profile';
import { Logo } from './logo';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = () => {
  return (
    <div className='flex items-center justify-between mb-8'>
      <div>
        <Link href={'/replacement'}>
          <Logo width={60} height={60} />
        </Link>
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

        <Profile name='Сметанин Евгений Евгеньевич' />
      </div>
    </div>
  );
};
