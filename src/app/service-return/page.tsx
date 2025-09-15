import { BatchesForReturn } from '@/shared/components/';
import { Button, Card, CardContent } from '@/shared/components/ui';
import { ArrowLeft, CheckCircle, Clock, Package } from 'lucide-react';
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

      {/* Статистика */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2'>
              <Clock className='h-5 w-5 text-orange-500' />
              <div>
                <p className='text-2xl font-bold'>{5}</p>
                <p className='text-sm text-muted-foreground'>В работе</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2'>
              <CheckCircle className='h-5 w-5 text-green-500' />
              <div>
                <p className='text-2xl font-bold'>{5}</p>
                <p className='text-sm text-muted-foreground'>Выполнено</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-4'>
            <div className='flex items-center space-x-2'>
              <Package className='h-5 w-5 text-blue-500' />
              <div>
                <p className='text-2xl font-bold'>{5}</p>
                <p className='text-sm text-muted-foreground'>Всего партий</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Партии для возврата */}
      <BatchesForReturn />
    </div>
  );
}
