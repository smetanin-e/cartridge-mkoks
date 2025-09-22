'use client';

import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Badge,
} from '@/shared/components/ui';
import { useCartridgeStore } from '@/shared/store/cartridges';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '@/shared/lib';
import { getStatusBadge } from '../utils';
import { ClearButton } from '../cleare-button';
import { CartridgeDTO, CartridgeModelDTO } from '@/shared/services/dto/cartridge-model.dto.';

type departamentType = {
  name: string;
  id: number;
};
interface Props {
  className?: string;
  items: CartridgeDTO[] | CartridgeModelDTO[] | departamentType[];
}

export const CustomSelect: React.FC<Props> = () => {
  const items = useCartridgeStore((state) => state.cartridges);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [value, setValue] = React.useState<string | null>(null);

  const filtered = items.filter((item) => item.number.toLowerCase().includes(search.toLowerCase()));

  const [element, setElement] = React.useState<CartridgeDTO | null>(null);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='relative'>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between font-normal relative pr-12'
          >
            <div className='w-full flex items-center gap-2'>
              <div>{value ?? 'Select a fruit'}</div>
              {/* Если тип CartridgeDTO[] то добавляем этот блок */}{' '}
              {element && (
                <div className='flex-1 flex justify-between gap-2'>
                  <Badge variant={'secondary'}>
                    <strong>{element.model?.model}</strong>
                  </Badge>
                  {getStatusBadge(element.status)}
                </div>
              )}
            </div>
            {!value && <ChevronDown className=' h-4 w-4 shrink-0 opacity-50' />}
          </Button>
        </PopoverTrigger>
        {value && (
          <ClearButton
            onClick={() => {
              setValue(null);
              setElement(null);
            }}
          />
        )}
      </div>

      <PopoverContent align='start' className='p-0 relative w-[350px] p-2'>
        <div className='relative'>
          <Input
            placeholder='Поиск...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />{' '}
          {search && <ClearButton onClick={() => setSearch('')} />}
        </div>

        <div className='max-h-[200px] overflow-y-auto mt-2'>
          {filtered.length === 0 && (
            <div className='text-sm text-muted-foreground px-2 py-1.5'>Ничего не найдено</div>
          )}
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setValue(item.number);
                setElement(item);
                setOpen(false);
                setSearch('');
              }}
              className={cn(
                'cursor-pointer px-2 py-1.5 rounded-sm hover:bg-accent',
                value === item.number && 'bg-accent',
              )}
            >
              <div className='w-full grid grid-cols-[auto_1fr_auto] items-center gap-2'>
                <div>{item.number}</div>
                {/* Если тип CartridgeDTO[] то добавляем этот блок */}
                <>
                  {' '}
                  <Badge variant={'outline'}>
                    <strong> {item.model?.model}</strong>
                  </Badge>
                  <div>{getStatusBadge(item.status)}</div>
                </>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
