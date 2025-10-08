'use client';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ClearButton, CustomSelect, ErrorText, RequiredSymbol } from '@/shared/components';

interface Props<T> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
  error?: string;
  //==================
  items: T[];
  getKey: (item: T) => number | string;
  getLabel: (item: T) => string;
  placeholder?: string;
  renderItem: (item: T, selected: boolean) => React.ReactNode;
  renderValue?: (item: T) => React.ReactNode;
  onAdd?: React.ReactNode;
}

export const FormCustomSelect = <T extends object>({
  label,
  name,
  required,
  error,
  items,
  getKey,
  getLabel,
  placeholder,
  renderItem,
  renderValue,
  onAdd,
}: Props<T>) => {
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
              <CustomSelect<T>
                items={items}
                value={items.find((i) => getKey(i) === field.value) ?? null}
                onChange={(val) => field.onChange(val ? getKey(val) : null)}
                getKey={getKey}
                getLabel={getLabel}
                placeholder={placeholder}
                renderValue={renderValue}
                renderItem={renderItem}
                onAdd={onAdd}
              />
              {field.value && <ClearButton onClick={() => field.onChange(null)} />}
            </div>
          );
        }}
      />

      {error && errorText && <ErrorText text={error} className='absolute text-[12px] right-0' />}
    </div>
  );
};
