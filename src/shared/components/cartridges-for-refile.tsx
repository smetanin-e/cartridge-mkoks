'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
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
import { getStatusBadge } from './utils';
interface Props {
  className?: string;
}

export const CartridgesForRefile: React.FC<Props> = () => {
  const { cartridges, getCartriges } = useCartridgeStore();
  React.useEffect(() => {
    if (cartridges.length === 0) {
      getCartriges();
    }
  }, []);
  const availableForService = cartridges.filter(
    (cartridge) =>
      cartridge.status === CartridgeStatus.REFILL || cartridge.status === CartridgeStatus.RESERVE,
  );

  const [selectedCartridges, setSelectedCartridges] = React.useState<number[]>([]);

  const handleCartridgeSelect = (cartridgeId: number, checked: boolean) => {
    if (checked) {
      setSelectedCartridges((prev) => [...prev, cartridgeId]);
    } else {
      setSelectedCartridges((prev) => prev.filter((id) => id !== cartridgeId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const availableIds = availableForService.map((c) => c.id);
      setSelectedCartridges(availableIds);
    } else {
      setSelectedCartridges([]);
    }
  };

  const isAllSelected =
    availableForService.length > 0 && selectedCartridges.length === availableForService.length;

  console.log('selectedCartridges===========', selectedCartridges);

  return (
    <div className='lg:col-span-2'>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>Доступные для отправки ({availableForService.length})</CardTitle>
            <div className='flex items-center space-x-2'>
              <Checkbox id='select-all' checked={isAllSelected} onCheckedChange={handleSelectAll} />
              <Label htmlFor='select-all' className='text-sm'>
                Выбрать все
              </Label>
            </div>
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
                {availableForService.map((cartridge) => (
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
