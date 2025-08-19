'use client';
import React from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { Filter, MoreHorizontal, Plus, Search, ToyBrick } from 'lucide-react';
import { useCartridgeStore } from '../store/cartridges';
import { CartridgeStatus } from '@prisma/client';
import { CARTRIDGE_STATUS_CONFIG } from '@/shared/constants';
import { ClearButton } from '@/shared/components';
interface Props {
  className?: string;
}

export const CartridgeList: React.FC<Props> = () => {
  const { cartridges, getCartriges } = useCartridgeStore();
  React.useEffect(() => {
    getCartriges();
  }, []);

  const getStatusBadge = (status: CartridgeStatus) => {
    const config = CARTRIDGE_STATUS_CONFIG[status];
    return <Badge className={`${config.color} text-white`}>{config.label}</Badge>;
  };

  const [searchValue, setSearchValue] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<CartridgeStatus | 'all'>('all');
  const filteredCartridges = cartridges.filter((cartridge) => {
    const matchesSearch =
      cartridge.number.toLowerCase().includes(searchValue.toLowerCase()) ||
      cartridge.model?.model.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cartridge.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const onClickClear = () => {
    setSearchValue('');
  };

  return (
    <div>
      {/* Таблица картриджей */}
      <Card className='gap-1 p-0 overflow-hidden  '>
        <CardHeader className='pb-5 pt-4 relative shadow-sm bg-gray-50'>
          <div className='flex items-center justify-between'>
            <CardTitle className='flex items-center gap-2'>
              <ToyBrick className='h-5 w-5' />
              Реестр картриджей
            </CardTitle>
            <Button size={'sm'}>
              <Plus className='h-4 w-4 mr-2' />
              Добавить картридж
            </Button>
          </div>
          <div className='flex flex-col  md:flex-row gap-4 mt-2'>
            <div className='relative'>
              <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Поиск...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className='pl-10 bg-white'
              />
              {searchValue && <ClearButton onClick={onClickClear} />}
            </div>

            <div className='w-full md:w-4'>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as CartridgeStatus | 'all')}
              >
                <SelectTrigger className='bg-white'>
                  <Filter className='h-4 w-4 mr-2' />
                  <SelectValue placeholder='Статус' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Все статусы</SelectItem>
                  {Object.entries(CARTRIDGE_STATUS_CONFIG).map(([status, config]) => (
                    <SelectItem key={status} value={status}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
                  {/* <TableRow>
                  <TableCell colSpan={4} className='text-center py-8 text-muted-foreground'>
                    Картриджи не найдены
                  </TableCell>
                </TableRow> */}
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
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className='h-8 w-8 p-0'>
                                  <MoreHorizontal className='h-4 w-4' />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align='end'>
                                <DropdownMenuItem> Статус</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
