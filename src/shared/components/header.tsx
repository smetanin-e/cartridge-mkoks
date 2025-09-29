import Link from 'next/link';
import React from 'react';
import { Button } from '@/shared/components/ui';
import { Download, Package } from 'lucide-react';
import Image from 'next/image';
import { Profile } from './profile';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = () => {
  return (
    <div className='flex items-center justify-between mb-8'>
      <div>
        <Link href={'/replacement'}>
          {' '}
          <Image src={'/ygmk.png'} width={150} height={50} alt='logo' />
        </Link>
      </div>
      <div className='flex gap-2 items-center'>
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

        <Profile name='Укрепин Сергей Александрович' />
      </div>
    </div>
  );
};
