'use client';
import React from 'react';
import { Batches, CartridgesForService, CreateBatchForm } from '@/shared/components';

export default function ServiceBatch() {
  const [selectedCartridges, setSelectedCartridges] = React.useState<number[]>([]);

  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Список доступных картриджей */}
        <CartridgesForService
          selectedCartridges={selectedCartridges}
          setSelectedCartridges={setSelectedCartridges}
        />

        {/* Форма создания партии */}
        <CreateBatchForm
          selectedCartridges={selectedCartridges}
          setSelectedCartridges={setSelectedCartridges}
        />
      </div>
      <Batches />
    </div>
  );
}
