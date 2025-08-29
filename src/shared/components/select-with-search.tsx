import React from 'react';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui';
import { Check, ChevronDown, Plus } from 'lucide-react';
import { cn, hasStatus } from '@/shared/lib';
import { getStatusBadge } from './utils';
import { CartridgeStatus } from '@prisma/client';
interface BaseSelectProps<T> {
  options: T[];
  value?: string | number;
  onChange: (value: string | number, option: T) => void;

  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string | number;

  placeholder?: string;
  onAdd?: () => void;
  addLabel?: string;
}

export function SelectWithSearch<T extends object>({
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
  placeholder,
  onAdd,
  addLabel,
}: BaseSelectProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const selected = options.find((f) => getOptionValue(f) === value);
  const selectedLabel = selected ? getOptionLabel(selected) : '';
  const selectedStatus =
    selected !== undefined && hasStatus(selected) ? selected.status : undefined;
  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o) setSearchValue(selectedLabel || ''); // при открытии подставляем выбранное имя
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between font-normal'
        >
          {selectedLabel ? (
            <div className='w-full flex items-center justify-between gap-2'>
              <div className='shrink-0'>{selected ? getOptionLabel(selected) : ''}</div>
              <div className='pr-8'>
                {selectedStatus && getStatusBadge(selectedStatus as CartridgeStatus)}
              </div>
            </div>
          ) : (
            placeholder
          )}

          {!open && !value && <ChevronDown className='ml-2 mr-1 h-5 w-5 shrink-0 opacity-50' />}
        </Button>
      </PopoverTrigger>

      <PopoverContent align='start' className='p-0 relative w-full'>
        <div className='w-[462px]'>
          <Command>
            <CommandInput
              placeholder='Поиск или ввод...'
              value={searchValue}
              onValueChange={setSearchValue} // управляем поиском отдельно
              autoFocus
            />
            <CommandEmpty>
              <p className='pb-2'>Ничего не найдено</p>{' '}
              {onAdd && (
                <Button type='button' onClick={onAdd} variant={'outline'} size={'sm'}>
                  <Plus className='h-4 w-4 mr-2' />
                  {addLabel}
                </Button>
              )}
            </CommandEmpty>
            <CommandGroup className='w-full h-[200px] overflow-auto'>
              {options
                .filter((opt) =>
                  getOptionLabel(opt).toLowerCase().includes(searchValue.toLowerCase()),
                )
                .map((opt) => {
                  const optionValue = getOptionValue(opt);
                  const status = hasStatus(opt) ? opt.status : undefined;
                  return (
                    <CommandItem
                      className='w-full'
                      key={optionValue}
                      value={getOptionLabel(opt)}
                      onSelect={() => {
                        onChange(optionValue, opt); // сохраняем id
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === optionValue ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <div className='w-full grid grid-cols-[1fr_auto] items-center gap-2'>
                        <div>{getOptionLabel(opt)}</div>
                        {status && <div>{getStatusBadge(status as CartridgeStatus)}</div>}
                      </div>
                    </CommandItem>
                  );
                })}
            </CommandGroup>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  );
}
