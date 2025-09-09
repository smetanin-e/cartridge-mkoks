'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { useCartridgeStore } from '../store/cartridges';
import { CartridgeStatus } from '@prisma/client';
import { getStatusBadge } from '@/shared/components/utils';
import { useServiceBatchStore } from '../store/service-batch';
import { ClearButton } from '@/shared/components';
import { Search } from 'lucide-react';
interface Props {
  className?: string;
}

export const CartridgesForRefile: React.FC<Props> = () => {
  const { cartridges, getCartriges } = useCartridgeStore();
  const [cartridgesSearch, setCartridgesSearch] = React.useState('');
  const {
    selectedCartridges,
    checkedReserve,
    handleCheckedReserve,
    handleSelectAll,
    handleCartridgeSelect,
    cleareSelectedCartridges,
  } = useServiceBatchStore();

  React.useEffect(() => {
    getCartriges();
    return () => {
      cleareSelectedCartridges();
    };
  }, []);

  const availableForService = cartridges.filter((cartridge) =>
    checkedReserve
      ? cartridge.status === CartridgeStatus.REFILL || cartridge.status === CartridgeStatus.RESERVE
      : cartridge.status === CartridgeStatus.REFILL,
  );

  const isAllSelected =
    availableForService.length > 0 && selectedCartridges.length === availableForService.length;

  const filteredCartriges = availableForService.filter((cartridge) =>
    cartridgesSearch
      ? cartridge.number.toLowerCase().includes(cartridgesSearch.toLowerCase())
      : true,
  );

  console.log('selectedCartridges===========', selectedCartridges);

  return (
    <div className='lg:col-span-2'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>Доступные для отправки ({availableForService.length})</CardTitle>
            <div className='flex gap-10'>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='select-reserve'
                  checked={checkedReserve}
                  onCheckedChange={handleCheckedReserve}
                />
                <Label htmlFor='select-reserve' className='text-sm'>
                  Резерв
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='select-all'
                  checked={isAllSelected}
                  onCheckedChange={(checked) =>
                    handleSelectAll(checked === true, availableForService)
                  }
                />
                <Label htmlFor='select-all' className='text-sm'>
                  Выбрать все
                </Label>
              </div>
            </div>
          </div>
          <div className='relative mt-2'>
            <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Поиск по номеру картриджа...'
              value={cartridgesSearch}
              onChange={(e) => setCartridgesSearch(e.target.value)}
              className='pl-10'
            />
            {cartridgesSearch && <ClearButton onClick={() => setCartridgesSearch('')} />}
          </div>
        </CardHeader>
        <CardContent>
          {availableForService.length === 0 ? (
            <div className='text-center py-8 text-muted-foreground'>
              Нет картриджей доступных для отправки в сервис
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-12'></TableHead>
                  <TableHead>Номер</TableHead>
                  <TableHead>Модель</TableHead>
                  <TableHead>Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCartriges.map((cartridge) => (
                  <TableRow key={cartridge.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCartridges.includes(cartridge.id)}
                        onCheckedChange={(checked) =>
                          handleCartridgeSelect(cartridge.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className='font-medium'>{cartridge.number}</TableCell>
                    <TableCell>{cartridge.model?.model}</TableCell>
                    <TableCell>{getStatusBadge(cartridge.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
