import { BatchesComplited, BatchesForReturn } from '@/shared/components/';
import { Button } from '@/shared/components/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ServiceReturn() {
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
          <h1 className='text-3xl font-bold'>Прием из сервиса</h1>
          <p className='text-muted-foreground'>
            Управление возвратом картриджей из сервисного центра
          </p>
        </div>
      </div>

      {/* Партии для возврата */}
      <BatchesForReturn />

      {/* Выполненные партии*/}
      <BatchesComplited />
    </div>
  );
}
