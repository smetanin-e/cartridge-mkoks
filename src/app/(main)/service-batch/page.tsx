'use client';
import React from 'react';
import { Batches, CartridgesForService, ServiceBatchForm } from '@/shared/components';

export default function ServiceBatch() {
  const [selectedCartridges, setSelectedCartridges] = React.useState<number[]>([]);

  return (
    <div>
      {/* <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold'>Отправка в сервис</h1>
        <p className='text-muted-foreground'>
          Формирование партий картриджей для отправки в сервисный центр
        </p>
      </div> */}

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
