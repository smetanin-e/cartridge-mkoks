'use client';

import { Button } from '@/shared/components/ui';
import { Download, Edit, Package } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
// import { Toaster } from 'react-hot-toast';

export default function Home() {
  return (
    <div className='container mx-auto p-6'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <h1 className='text-3xl font-bold'>Управление картриджами</h1>
          <p className='text-muted-foreground mt-2'>
            Управление статусами и отслеживание картриджей
          </p>
        </div>
        <div className='flex gap-2'>
          <Link href='/replacement'>
            <Button variant='outline' className='flex items-center gap-2'>
              <Edit className='h-4 w-4' />
              Замена картриджа
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
            <Button className='flex items-center gap-2'>Картриджи</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
