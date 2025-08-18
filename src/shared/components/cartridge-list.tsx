'use client';
import React from 'react';
import {
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
import { Filter, MoreHorizontal, Search } from 'lucide-react';
import { useCartridgeStore } from '../store/cartridges';
interface Props {
  className?: string;
}

const statusConfig = {
  available: {
    label: 'Готов к использованию',
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
  },
  reserve: {
    label: 'Снят с обслуживания',
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
  },
  working: {
    label: 'В работе',
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
  },
  service: {
    label: 'В сервисе',
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
  },
  refill: {
    label: 'Требуется заправка',
    color: 'bg-purple-500',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
  },
};

export const CartridgeList: React.FC<Props> = () => {
  const { cartridges, getCartriges } = useCartridgeStore();
  React.useEffect(() => {
    getCartriges();
  }, []);
  console.log(cartridges);
  return (
    <div className='mt-8'>
      {/* Таблица картриджей */}
      <Card className='gap-2'>
        <CardHeader>
          <CardTitle>Реестр картриджей</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col  md:flex-row gap-4 justify-center mb-2'>
            <div className='w-[450px]'>
              <div className='relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Поиск по номеру или модели...'
                  //value={searchTerm}
                  //onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
            </div>
            <div className='w-full md:w-48'>
              <Select
              // value={statusFilter}
              //onValueChange={(value) => setStatusFilter(value as CartridgeStatus | 'all')}
              >
                <SelectTrigger>
                  <Filter className='h-4 w-4 mr-2' />
                  <SelectValue placeholder='Статус' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>Все статусы</SelectItem>
                  {Object.entries(statusConfig).map(([status, config]) => (
                    <SelectItem key={status} value={status}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
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
                <></>
              )}
              <TableRow>
                <TableCell className='font-medium'>МК150</TableCell>
                <TableCell>CE505A</TableCell>
                <TableCell>состояние</TableCell>
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
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
