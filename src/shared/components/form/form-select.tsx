'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { ClearButton, ErrorText, RequiredSymbol } from '@/shared/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';

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

export const FormSelect: React.FC<Props> = ({ name, label, required, options }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;

  return (
    <div className=''>
      {label && (
        <p className='font-medium mb-0.5 text-sm'>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className='relative'>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className='h-12 text-md w-full'>
                <SelectValue placeholder='Выберите...' />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.value && <ClearButton onClick={() => field.onChange('')} />}
          </div>
        )}
      />

      {errorText && <ErrorText text={errorText} className='absolute text-[12px] right-0' />}
    </div>
  );
};
