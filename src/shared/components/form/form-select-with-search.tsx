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
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/shared/lib';

interface Option {
  value: string;
  label: string;
}
interface Props {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  options: Option[];
}

export const FormSelectWithSearch: React.FC<Props> = ({ name, label, required, options }) => {
  const [open, setOpen] = React.useState(false);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;

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
        render={({ field }) => (
          <div className='relative'>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className='relative'>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={open}
                  className='w-full justify-between font-normal'
                >
                  {field.value
                    ? options.find((f) => f.value === field.value)?.label ?? field.value
                    : 'Выберите или введите...'}
                  <>
                    {!open && !field.value && (
                      <ChevronDown className='ml-2 mr-1 h-5 w-5 shrink-0 opacity-50' />
                    )}
                  </>
                </Button>
              </PopoverTrigger>
              <PopoverContent align='start' className='p-0'>
                <Command>
                  <CommandInput
                    placeholder='Поиск или ввод...'
                    value={field.value}
                    onValueChange={field.onChange}
                    autoFocus
                  />
                  <CommandEmpty>Ничего не найдено</CommandEmpty>
                  <CommandGroup>
                    {options.map((framework) => (
                      <CommandItem
                        className='cursor-pointer'
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          field.onChange(currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            field.value === framework.value ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {field.value && <ClearButton onClick={() => field.onChange('')} />}
          </div>
        )}
      />

      {errorText && <ErrorText text={errorText} className='absolute text-[12px] right-0' />}
    </div>
  );
};
