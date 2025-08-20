import React from 'react';
import { ClearButton, ErrorText, RequiredSymbol } from '@/shared/components';
import { Controller, useFormContext } from 'react-hook-form';

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

import { cn } from '@/shared/lib';
import { Model } from '@prisma/client';
import { useModelsStore } from '@/shared/store/cartridge-models';

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  options: Model[];
  error: string;
}

export const FormSelectWithSearch: React.FC<Props> = ({
  name,
  label,
  required,
  options,
  error,
}) => {
  const [open, setOpen] = React.useState(false);

  const [searchValue, setSearchValue] = React.useState('');
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;

  const { setOpenModal } = useModelsStore();

  return (
    <div className='relative'>
      {label && (
        <p className='font-medium mb-0.5 text-sm'>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedModel = options.find((f) => f.id === field.value)?.model ?? '';

          return (
            <div className='relative'>
              <Popover
                open={open}
                onOpenChange={(o) => {
                  setOpen(o);
                  if (o) setSearchValue(selectedModel || ''); // при открытии подставляем выбранное имя
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
                    {selectedModel || 'Выберите или введите...'}
                    {!open && !field.value && (
                      <ChevronDown className='ml-2 mr-1 h-5 w-5 shrink-0 opacity-50' />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align='start' className='p-0 '>
                  <Command>
                    <CommandInput
                      placeholder='Поиск или ввод...'
                      value={searchValue}
                      onValueChange={setSearchValue} // управляем поиском отдельно
                      autoFocus
                    />
                    <CommandEmpty>
                      <p className='pb-2'>Ничего не найдено</p>{' '}
                      <Button
                        type='button'
                        onClick={() => setOpenModal(true)}
                        variant={'outline'}
                        size={'sm'}
                      >
                        <Plus className='h-4 w-4 mr-2' />
                        Добавить
                      </Button>
                    </CommandEmpty>
                    <CommandGroup className='h-[200px] overflow-auto'>
                      {options
                        .filter((opt) =>
                          opt.model.toLowerCase().includes(searchValue.toLowerCase()),
                        )
                        .map((data) => (
                          <CommandItem
                            key={data.id}
                            value={data.model}
                            onSelect={() => {
                              field.onChange(Number(data.id)); // сохраняем id
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                field.value === data.id ? 'opacity-100' : 'opacity-0',
                              )}
                            />
                            {data.model}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {field.value && <ClearButton onClick={() => field.onChange('')} />}
            </div>
          );
        }}
      />

      {errorText && <ErrorText text={error} className='absolute text-[12px] right-0' />}
    </div>
  );
};
