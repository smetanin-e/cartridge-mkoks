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
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';
import { cn } from '@/shared/lib';

interface Props {
  value: string;
  onChange: (value: string) => void;
}
const frameworks = [
  { value: 'CE505A', label: 'CE505A' },
  { value: 'CF280A', label: 'CF280A' },
  { value: 'CB435A', label: 'CB435A' },
  { value: 'HP 12A', label: 'HP 12A' },
];

export const Test: React.FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className='relative'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className='relative'>
          <Button variant='outline' role='combobox' aria-expanded={open} className=' justify-start'>
            {value
              ? frameworks.find((f) => f.value === value)?.label ?? value
              : 'Выберите или введите...'}
            {/* <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' /> */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0'>
          <Command>
            <CommandInput
              placeholder='Поиск или ввод...'
              value={value}
              onValueChange={onChange}
              autoFocus
            />
            <CommandEmpty>Ничего не найдено</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === framework.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
