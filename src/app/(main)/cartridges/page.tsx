import { CartridgeList, Header, Printers, RegisterModel } from '@/shared/components';
import React from 'react';

export default function CartridgesPage() {
  return (
    <div>
      <Header
        title='Реестр картриджей'
        description='Регистрация картриджей, управление состоянием'
      />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-6'>
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
