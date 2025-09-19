'use client';
import { Batches, CartridgesForService, ServiceBatchForm } from '@/shared/components';
import { Button } from '@/shared/components/ui';
import { useBatchList } from '@/shared/hooks';
import { BatchStatus } from '@prisma/client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function ServiceBatch() {
  const [selectedCartridges, setSelectedCartridges] = React.useState<number[]>([]);

  return (
    <div className='container mx-auto p-6'>
      <div className='flex items-center gap-4 mb-6'>
        <Link href='/'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Назад
          </Button>
        </Link>
        <div>
          <h1 className='text-3xl font-bold'>Отправка в сервис</h1>
          <p className='text-muted-foreground'>
            Формирование партий картриджей для отправки в сервисный центр
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Список доступных картриджей */}
        <CartridgesForService
          selectedCartridges={selectedCartridges}
          setSelectedCartridges={setSelectedCartridges}
        />

        {/* Форма создания партии */}
        <ServiceBatchForm
          selectedCartridges={selectedCartridges}
          setSelectedCartridges={setSelectedCartridges}
        />
      </div>
      <Batches />
    </div>
  );
}
