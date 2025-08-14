'use client';

import { Printers, RegisterCartridge, RegisterModel } from '@/shared/components';
import { Button } from '@/shared/components/ui';
import { ArrowLeft, Package, Plus, PrinterIcon, Search } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function CartridgesPage() {
  //=============================================

  return (
    <div className='container mx-auto p-6'>
      {/* HEADER */}
      <div className='flex items-center gap-4 mb-6'>
        <Link href='/'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Назад
          </Button>
        </Link>
        <div>
          <h1 className='text-3xl font-bold'>Реестр картриджей</h1>
          <p className='text-muted-foreground'>
            Управление моделями картриджей и совместимостью принтеров
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-6'>
          {/* Регистрация картриджа */}
          <RegisterCartridge />

          {/* Добавление новой модели картриджа */}
          <RegisterModel />
        </div>

        {/* Таблица принтеров */}
        <Printers />
      </div>

      <Toaster />
    </div>
  );
}
