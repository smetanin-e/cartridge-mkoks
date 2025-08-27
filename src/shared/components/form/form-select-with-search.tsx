import React from 'react';
import { ClearButton, ErrorText, RequiredSymbol, SelectWithSearch } from '@/shared/components';
import { Controller, useFormContext } from 'react-hook-form';

interface Props<T> {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  options: T[];
  error?: string;
  onAdd?: () => void;
  addLabel?: string;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string | number;
}

export function FormSelectWithSearch<T>({
  name,
  label,
  placeholder,
  required,
  options,
  error,
  onAdd,
  addLabel,
  getOptionLabel,
  getOptionValue,
}: Props<T>) {
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
        render={({ field }) => {
          return (
            <div className='relative'>
              <SelectWithSearch<T>
                options={options}
                value={field.value}
                onChange={field.onChange}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
                onAdd={onAdd}
                addLabel={addLabel}
                placeholder={placeholder}
              />
              {field.value && <ClearButton onClick={() => field.onChange('')} />}
            </div>
          );
        }}
      />

      {error && errorText && <ErrorText text={error} className='absolute text-[12px] right-0' />}
    </div>
  );
}
