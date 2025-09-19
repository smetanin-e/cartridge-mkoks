'use client';
import React from 'react';
import { Card, CardContent } from '@/shared/components/ui';
import { Bolt, CheckCircle, Clock, LifeBuoy, TriangleAlert } from 'lucide-react';
import { useCartridgeStore } from '../store/cartridges';
import { CartridgeStatus } from '@prisma/client';

interface Props {
  className?: string;
}

export const Stats: React.FC<Props> = () => {
  const cartridges = useCartridgeStore((state) => state.cartridges);
  const refill = cartridges.filter((c) => c.status === CartridgeStatus.REFILL).length;
  const avaible = cartridges.filter((c) => c.status === CartridgeStatus.AVAILABLE).length;
  const service = cartridges.filter((c) => c.status === CartridgeStatus.SERVICE).length;
  const working = cartridges.filter((c) => c.status === CartridgeStatus.WORKING).length;
  const reserve = cartridges.filter((c) => c.status === CartridgeStatus.RESERVE).length;
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6'>
      <Card>
        <CardContent className='p-4'>
          <div className='flex items-center space-x-4'>
            <TriangleAlert className='h-13 w-13 text-red-500' />
            <div>
              <p className='text-4xl font-bold'>{refill}</p>
              <p className='text-sm text-muted-foreground'>Требуется заправка</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='p-4'>
          <div className='flex items-center space-x-4'>
            <CheckCircle className='h-13 w-13 text-green-500' />
            <div>
              <p className='text-4xl font-bold'>{avaible}</p>
              <p className='text-sm text-muted-foreground'>Доступно</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-4'>
          <div className='flex items-center space-x-4'>
            <Bolt className='h-13 w-13 text-blue-500' />
            <div>
              <p className='text-4xl font-bold'>{service}</p>
              <p className='text-sm text-muted-foreground'>В сервисе</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-4'>
          <div className='flex items-center space-x-4'>
            <Clock className='h-13 w-13 text-orange-500' />
            <div>
              <p className='text-4xl font-bold'>{working}</p>
              <p className='text-sm text-muted-foreground'>В работе</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className='p-4'>
          <div className='flex items-center space-x-4'>
            <LifeBuoy className='h-13 w-13 text-purple-500' />
            <div>
              <p className='text-4xl font-bold'>{reserve}</p>
              <p className='text-sm text-muted-foreground'>Резерв</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
