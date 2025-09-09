import { CartridgesForRefile, ServiceBatchForm } from '@/shared/components';
import { Button } from '@/shared/components/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ServiceBatch() {
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
        <CartridgesForRefile />

        {/* Форма создания партии */}
        <ServiceBatchForm />
      </div>
    </div>
  );
}
