'use client';
import { useFormContext } from 'react-hook-form';
import { ClearButton, ErrorText, RequiredSymbol } from '@/shared/components';
import { Input } from '@/shared/components/ui';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({ name, label, required, type, ...props }) => {
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

  return (
    <div className='relative'>
      {label && (
        <p className='font-medium mb-0.5 text-sm'>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className='relative max-w-[462px]'>
        <Input className='h-8 text-md' {...register(name)} {...props} type={type} />

        {value && !required && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className='absolute text-[12px] right-0' />}
    </div>
  );
};
