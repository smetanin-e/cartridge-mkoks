'use client';
import React from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { FormInput, FormSelect, FormSelectWithSearch } from '@/shared/components';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegisterCartridgeFormType,
  registerCartridgeSchema,
} from '@/shared/schemas/register-сartrige-schema';
import toast from 'react-hot-toast';
import { useModelsStore } from '../store/cartridge-models';
import { CartridgeStatus } from '@prisma/client';
import { registerCartridge } from '../services/register-cartridge';

interface Props {
  className?: string;
}

const options = [
  { label: 'Готов к использованию', value: CartridgeStatus.AVAILABLE },
  { label: 'Требуется заправка', value: CartridgeStatus.REFILL },
  { label: 'В сервисном центре', value: CartridgeStatus.SERVICE },
  { label: 'В работе', value: CartridgeStatus.WORKING },
  { label: 'В резерве', value: CartridgeStatus.RESERVE },
];

export const RegisterCartridge: React.FC<Props> = () => {
  ///!Позже отрефакторить
  const { models, getModels } = useModelsStore();

  React.useEffect(() => {
    getModels();
  }, []);
  ///!=================

  const form = useForm<RegisterCartridgeFormType>({
    resolver: zodResolver(registerCartridgeSchema),
    defaultValues: {
      number: 'МК',
    },
  });

  const onSubmit = async (data: RegisterCartridgeFormType) => {
    try {
      console.log(data);
      await registerCartridge(data);
      toast.success('Картридж добавлен в реестр', {
        icon: '✅',
      });
      form.reset({
        number: 'МК',
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error [REGISTER_CARTRIDGE_FORM]', error);
        return toast.error(error.message, { icon: '❌' });
      }
    }
  };

  //console.log(models);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Добавление картриджа в реестр</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-3 '>
              <FormInput
                name='number'
                label='Номер картриджа'
                placeholder='Например, МК101'
                required
              />
              <FormSelectWithSearch
                name='modelId'
                label='Модель'
                required
                options={models}
                error={'Необходимо выбрать модель из списка'}
              />

              <FormSelect required name='status' label='Состояние картриджа' options={options} />
            </div>

            <div className='pt-4 flex justify-end gap-8'>
              <Button type='button' variant='outline'>
                Отмена
              </Button>
              <Button type='submit'>Сохранить</Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
