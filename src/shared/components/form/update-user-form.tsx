'use client';
import React from 'react';
import { FormInput, FormSelect } from '@/shared/components/';
import { Button } from '@/shared/components/ui';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { USER_ROLES } from '@/shared/constants';
import { updateUserSchema, UpdateUserType } from '@/shared/schemas/update-user-schema';
import { Agent } from '@/shared/services/dto/agent.dto';

import { useUserStore } from '@/shared/store/user';
import { useAgentStore } from '@/shared/store/agents';
import { updateUser } from '@/shared/services/auth/auth-service';

interface Props {
  className?: string;
  setOpen: (value: boolean) => void;
  user: Agent;
}

export const UpdateUserForm: React.FC<Props> = ({ setOpen, user }) => {
  const authUser = useUserStore((state) => state.user);
  const [isSubmiting, setIsSubmiting] = React.useState(false);

  const form = useForm<UpdateUserType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: user.id,
      surname: user.surname,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  });
  if (!authUser) {
    return null;
  }
  const onSubmit = async (data: UpdateUserType) => {
    try {
      setIsSubmiting(true);
      await updateUser(data, authUser.id);

      useAgentStore.getState().getAgents();
      toast.success('Данные обновлены ✅');
      setOpen(false);
    } catch (error) {
      console.log('Error [UPDATE_USER_FORM]', error);
      return toast.error(
        error instanceof Error ? error.message : 'Не удалось обновить данные пользователя ❌',
      );
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
          <div className='hidden'>
            <FormInput name='id' id='id' type='number' value={user.id} readOnly />
          </div>
          <div className='space-y-2 mb-1'>
            <FormInput
              label='Фамилия'
              name='surname'
              id='surname'
              type='text'
              placeholder='Фамилия...'
              required
            />
          </div>
          <div className='space-y-2'>
            <FormInput
              label='Имя'
              name='firstName'
              id='firstName'
              type='text'
              placeholder='Имя...'
              required
            />
          </div>
          <div className='space-y-2'>
            <FormInput
              label='Отчество'
              name='lastName'
              id='lastName'
              type='text'
              placeholder='Отчество...'
              required
            />
          </div>

          <FormSelect required name='role' label='Роль' data={USER_ROLES} />
        </div>

        <div className='flex justify-end gap-6'>
          <Button disabled={isSubmiting} type='submit'>
            Обновить данные
          </Button>
          <Button
            disabled={isSubmiting}
            type='button'
            variant='outline'
            onClick={() => setOpen(false)}
          >
            Отмена
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
