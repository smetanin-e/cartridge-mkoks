'use client';
import React from 'react';
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
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

import { CartridgeStatus } from '@prisma/client';
import { getStatusBadge } from '@/shared/components/utils';

import { ClearButton, LoadingBounce } from '@/shared/components';
import { Search } from 'lucide-react';
import { useCartridgeStore } from '@/shared/store/cartridges';
import { CartridgeDTO } from '@/shared/services/dto/cartridge-model.dto.';
interface Props {
  className?: string;
  selectedCartridges: number[];
  setSelectedCartridges: (selectedCartridges: number[]) => void;
}

export const CartridgesForService: React.FC<Props> = ({
  selectedCartridges,
  setSelectedCartridges,
}) => {
  const { cartridges, getCartriges, loading } = useCartridgeStore();
  const [cartridgesSearch, setCartridgesSearch] = React.useState('');

  const [checkedReserve, setCheckedReserve] = React.useState(false);

  const availableForService = cartridges.filter((cartridge) =>
    checkedReserve
      ? cartridge.status === CartridgeStatus.REFILL || cartridge.status === CartridgeStatus.RESERVE
      : cartridge.status === CartridgeStatus.REFILL,
  );

  const previewModels = cartridges.filter((c) => selectedCartridges.includes(c.id));

  //Отображаем или не отображаем резервные картриджи
  const handleCheckedReserve = (checked: boolean) => {
    const isChecked = checked === true;
    setCheckedReserve(isChecked);

    if (!isChecked) {
      setSelectedCartridges([]);
    }
  };
  //=====================================================

  const handleSelectAll = (checked: boolean, availableForService: CartridgeDTO[]) => {
    if (checked) {
      const availableIds = availableForService.map((c) => c.id);
      setSelectedCartridges(availableIds);
    } else {
      setSelectedCartridges([]);
    }
  };
  //=====================================================

  const handleCartridgeSelect = (cartridgeId: number, checked: boolean) => {
    if (checked) {
      setSelectedCartridges([...selectedCartridges, cartridgeId]);
    } else {
      setSelectedCartridges(selectedCartridges.filter((id) => id !== cartridgeId));
    }
  };

  React.useEffect(() => {
    getCartriges();
  }, []);

  const isAllSelected =
    availableForService.length > 0 && selectedCartridges.length === availableForService.length;

  const filteredCartriges = availableForService.filter((cartridge) =>
    cartridgesSearch
      ? cartridge.number.toLowerCase().includes(cartridgesSearch.toLowerCase())
      : true,
  );

  return (
    <div className='lg:col-span-2'>
      <Card className='min-h-[431px] max-h-[620px] flex flex-col relative'>
        {loading ? (
          <LoadingBounce />
        ) : (
          <>
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
            <CardContent className='flex-1 overflow-y-scroll h-[100%]'>
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
            <CardFooter>
              <div>
                <h6>Выбранные картриджи:</h6>

                <div className='flex flex-wrap gap-2'>
                  {previewModels.length > 0 ? (
                    previewModels.map((c) => {
                      return (
                        <Badge key={c.id} variant='secondary' className='text-sm'>
                          {c.number}
                        </Badge>
                      );
                    })
                  ) : (
                    <span className='text-gray-500 text-sm'>Ничего не выбрано</span>
                  )}
                </div>
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};
