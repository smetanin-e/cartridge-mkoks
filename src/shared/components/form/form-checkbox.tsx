'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox, Label } from '@/shared/components/ui';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  value: number;
}

export const FormCheckbox: React.FC<Props> = ({ name, value, label }) => {
  const { watch, setValue } = useFormContext();
  const currentValues: number[] = watch(name) || [];
  const checked = currentValues.includes(value);

  const toggle = (newValue: boolean) => {
    let newValues: number[];
    if (newValue) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((v) => v !== value);
    }
    setValue(name, newValues, { shouldValidate: true });
  };

  return (
    <Label className='flex items-center gap-2 cursor-pointer'>
      <Checkbox checked={checked} onCheckedChange={(val) => toggle(Boolean(val))} />
      <span className='text-sm font-medium'>{label}</span>
    </Label>
  );
};
