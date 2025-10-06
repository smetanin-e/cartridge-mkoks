'use client';
import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { Plus, ToyBrick } from 'lucide-react';
import { useCartridgeStore } from '../store/cartridges';
import { CartridgeStatus } from '@prisma/client';
import {
  CartridgeActions,
  CartridgesFilter,
  LoadingBounce,
  RegisterCartridge,
} from '@/shared/components';
import { getStatusBadge } from '@/shared/components/utils';
import { useCartridgeList } from '../hooks';
interface Props {
  className?: string;
}

export const CartridgeList: React.FC<Props> = () => {
  const { loadingInitial, cartridges } = useCartridgeList();

  const [searchValue, setSearchValue] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<CartridgeStatus | 'all'>('all');
  const filteredCartridges = cartridges.filter((cartridge) => {
    const matchesSearch =
      cartridge.number.toLowerCase().includes(searchValue.toLowerCase()) ||
      cartridge.model?.model.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cartridge.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                <div className='h-[625px] overflow-auto overflow-y-scroll'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Номер</TableHead>
                        <TableHead>Модель</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className='text-right'>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartridges.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className='text-center py-8 text-muted-foreground'>
                            Картриджи не найдены
                          </TableCell>
                        </TableRow>
                      ) : (
                        <>
                          {filteredCartridges.map((cartridge) => (
                            <TableRow key={cartridge.id}>
                              <TableCell className='font-medium'>{cartridge.number}</TableCell>
                              <TableCell>{cartridge.model?.model}</TableCell>
                              <TableCell>{getStatusBadge(cartridge.status)}</TableCell>
                              <TableCell className='text-right'>
                                <CartridgeActions
                                  id={cartridge.id}
                                  currentStatus={cartridge.status}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <RegisterCartridge open={showDialog} onOpenChange={setShowDialog} />
    </div>
  );
};
