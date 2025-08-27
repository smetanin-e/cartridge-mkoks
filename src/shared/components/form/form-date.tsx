'use client';
import React from 'react';
import { Input } from '@/shared/components/ui';
import { useFormContext } from 'react-hook-form';
import { ErrorText, RequiredSymbol } from '@/shared/components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  name: string;
  required?: boolean;
}

export const FormDate: React.FC<Props> = ({ name, required, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;

  return (
    <div className='relative'>
      <p className='font-medium mb-0.5 text-sm'>Дата {required && <RequiredSymbol />}</p>

      <div className='relative max-w-[462px]'>
        <Input id='date' type='date' {...register(name)} {...props} />
      </div>

      {errorText && <ErrorText text={errorText} className='absolute text-[12px] right-0' />}
    </div>
  );
};
