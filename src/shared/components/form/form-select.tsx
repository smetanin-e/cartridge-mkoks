'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText, RequiredSymbol } from '@/shared/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';
import { CARTRIDGE_STATUS_CONFIG } from '@/shared/constants';

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormSelect: React.FC<Props> = ({ name, label, required }) => {
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
        control={control}
        name={name}
        render={({ field }) => {
          const value = field.value ?? '';
          return (
            <div className='relative'>
              <Select value={value} onValueChange={field.onChange}>
                <SelectTrigger className='h-12 text-md w-full'>
                  <SelectValue placeholder='Выберите...' />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CARTRIDGE_STATUS_CONFIG).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }}
      />

      {errorText && <ErrorText text={errorText} className='absolute text-[12px] right-0' />}
    </div>
  );
};
