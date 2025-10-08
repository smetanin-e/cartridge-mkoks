'use client';
import React from 'react';
import { FormInput } from '@/shared/components/';
import { Button } from '@/shared/components//ui';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { LoginFormType, loginSchema } from '@/shared/schemas/auth/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { signIn } from '@/shared/services/auth/sign-in';

interface Props {
  className?: string;
}

export const LoginForm: React.FC<Props> = () => {
  const router = useRouter();
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    try {
      await signIn(data);

      router.push('/replacement');
      toast.success('Вы успешно вошли в аккаунт ✅');
    } catch (error) {
      console.log('Error [LOGIN_FORM]', error);
      return toast.error(error instanceof Error ? error.message : 'Не удалось войти в аккаунт ❌');
    }
  };
  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-2'>
          <FormInput
            label='Логин'
            name='login'
            id='login'
            type='text'
            placeholder='Логин...'
            required
          />
        </div>
        <div className='space-y-2'>
          <FormInput
            label='Пароль'
            name='password'
            id='password'
            type='password'
            placeholder='Введите пароль'
            required
          />
        </div>

        <Button disabled={form.formState.isSubmitting} className='w-full' type='submit'>
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
