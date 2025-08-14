import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input, Label } from '@/shared/components/ui';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  value: number;
  className?: string;
}

export const FormCheckbox: React.FC<Props> = ({ name, value, label, className }) => {
  const { watch, setValue } = useFormContext();
  const currentValues: number[] = watch(name) || [];
  const checked = currentValues.includes(value);

  const toggle = () => {
    let newValues: number[];
    if (checked) {
      newValues = currentValues.filter((v) => v !== value);
    } else {
      newValues = [...currentValues, value];
    }
    setValue(name, newValues, { shouldValidate: true });
  };

  return (
    <Label className='flex items-center gap-2 cursor-pointer'>
      <Input
        type='checkbox'
        checked={checked}
        onChange={toggle}
        className={`h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${className}`}
      />
      <span className='text-sm font-medium'>{label}</span>
    </Label>
  );
};
