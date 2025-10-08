'use client';

import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button, Input } from '@/shared/components/ui';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib';
import { ClearButton } from '@/shared/components';

type CustomSelectProps<T> = {
  items: T[];
  value: T | null;
  onChange: (val: T | null) => void;
  getKey: (item: T) => number | string;
  getLabel: (item: T) => string; // используется для поиска
  placeholder?: string;
  renderItem: (item: T, selected: boolean) => React.ReactNode;
  renderValue?: (item: T) => React.ReactNode;
  onAdd?: React.ReactNode;
};

export function CustomSelect<T>({
  items,
  value,
  onChange,
  getKey,
  getLabel,
  placeholder = 'Select...',
  renderItem,
  renderValue,
  onAdd,
}: CustomSelectProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const filtered = items.filter((item) =>
    getLabel(item).toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='relative'>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between font-normal relative pr-12 h-8 text-md'
          >
            <div className='flex items-center gap-2 flex-1 text-[14px]'>
              {value ? (renderValue ? renderValue(value) : getLabel(value)) : placeholder}
            </div>
            {!value && <ChevronDown className='h-4 w-4 shrink-0 opacity-50' />}
          </Button>
        </PopoverTrigger>
      </div>

      <PopoverContent
        align='start'
        className='min-w-[var(--radix-popover-trigger-width)] p-2'
        onWheel={(e) => e.stopPropagation()}
      >
        <div className='relative'>
          <Input
            placeholder='Поиск...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          {search && <ClearButton onClick={() => setSearch('')} />}
        </div>

        <div className='max-h-[200px] overflow-y-auto mt-2'>
          {filtered.length === 0 && (
            <div className='flex items-center justify-between'>
              <div className='text-sm text-muted-foreground px-2 py-1.5'>Ничего не найдено</div>
              {onAdd}
            </div>
          )}
          {filtered.map((item) => {
            const selected = value ? getKey(value) === getKey(item) : false;
            return (
              <div
                key={getKey(item)}
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                  setSearch('');
                }}
                className={cn(
                  'cursor-pointer px-2 py-1.5 rounded-sm hover:bg-accent',
                  selected && 'bg-accent',
                )}
              >
                {renderItem(item, selected)}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
