'use client';
import React from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { Plus, ToyBrick } from 'lucide-react';
import { CartridgeStatus } from '@prisma/client';
import {
  CartridgesFilter,
  CartridgesTable,
  LoadingBounce,
  RegisterCartridge,
} from '@/shared/components';
import { useCartridgeList } from '../../hooks';
import { searchCartridgesFilter } from '../../lib';
interface Props {
  className?: string;
}

export const CartridgeList: React.FC<Props> = () => {
  const { loadingInitial, cartridges } = useCartridgeList();

  const [searchValue, setSearchValue] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<CartridgeStatus | 'all'>('all');

  const filteredCartridges = searchCartridgesFilter(cartridges, searchValue, statusFilter);

  const [showDialog, setShowDialog] = React.useState(false);

  return (
    <div>
      {/* Таблица картриджей */}
      <Card className='gap-1 p-0 overflow-hidden  '>
        <CardHeader className='pb-5 pt-4 relative shadow-sm bg-card-header'>
          <div className='flex items-center justify-between'>
            <CardTitle className='flex items-center gap-2'>
              <ToyBrick className='h-5 w-5' />
              Реестр картриджей
            </CardTitle>
            <Button onClick={() => setShowDialog(true)} size={'sm'}>
              <Plus className='h-4 w-4 mr-2' />
              Добавить картридж
            </Button>
          </div>
          <CartridgesFilter
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </CardHeader>
        <CardContent className='relative h-[625px]'>
          {loadingInitial ? (
            <LoadingBounce />
          ) : (
            <>
              {filteredCartridges.length === 0 ? (
                <div className='h-[625px] text-center py-8 text-muted-foreground'>
                  Нет такого картриджа
                </div>
              ) : (
                <CartridgesTable count={filteredCartridges.length} items={filteredCartridges} />
              )}
            </>
          )}
        </CardContent>
      </Card>
      <RegisterCartridge open={showDialog} onOpenChange={setShowDialog} />
    </div>
  );
};
