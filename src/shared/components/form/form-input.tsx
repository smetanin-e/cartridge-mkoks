'use client';
import { useFormContext } from 'react-hook-form';
import { ClearButton, ErrorText, RequiredSymbol } from '@/shared/components';
import { Input } from '@/shared/components/ui';
import React from 'react';
import { ShowPassword } from '../show-password';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  type: string;
}

export const FormInput: React.FC<Props> = ({ name, label, required, type, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='relative'>
      {label && (
        <p className='font-medium mb-0.5 text-sm'>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className='relative max-w-[462px]'>
        <Input
          className='h-8 text-md'
          {...register(name)}
          {...props}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        />
        {!props.readOnly && value && type !== 'password' && <ClearButton onClick={onClickClear} />}
        {value && type === 'password' && (
          <ShowPassword showPassword={showPassword} onClick={handleShowPassword} />
        )}
      </div>

      {errorText && <ErrorText text={errorText} className='absolute text-[12px] right-0' />}
    </div>
  );
};
