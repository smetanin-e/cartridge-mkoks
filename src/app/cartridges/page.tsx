import { CartridgeList, Printers, RegisterModel } from '@/shared/components';
import React from 'react';

export default function CartridgesPage() {
  return (
    <div>
      {/* <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold'>Реестр картриджей</h1>
        <p className='text-muted-foreground'>
          Управление моделями картриджей и совместимостью принтеров
        </p>
      </div> */}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-6'>
          {/* Регистрация картриджа */}
          {/* <RegisterCartridge /> */}
          <CartridgeList />
        </div>

        {/* Таблица принтеров */}
        <Printers />

        {/* Модальное окно регистрации новой модели */}
        <RegisterModel />
      </div>
    </div>
  );
}
