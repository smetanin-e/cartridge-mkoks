'use client';
import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui';
import { FormInput, FormSelect, FormSelectWithSearch } from '@/shared/components';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegisterCartridgeFormType,
  registerCartridgeSchema,
} from '@/shared/schemas/register-сartrige-schema';
import toast from 'react-hot-toast';
import { useModelsStore } from '../../store/cartridge-models';
import { registerCartridge } from '../../services/register-cartridge';
import { ToyBrick } from 'lucide-react';
import { Model } from '@prisma/client';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RegisterCartridge: React.FC<Props> = ({ open, onOpenChange }) => {
  ///!Позже отрефакторить
  const { models, getModels, setOpenModal } = useModelsStore();

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
      const payload = {
        ...data,
        numericNumber: parseInt(data.number.replace(/\D/g, ''), 10),
      };
      await registerCartridge(payload);
      toast.success('Картридж добавлен в реестр', {
        icon: '✅',
      });
      form.reset({
        number: 'МК',
      });
      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error [REGISTER_CARTRIDGE_FORM]', error);
        return toast.error(error.message, { icon: '❌' });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <ToyBrick className='h-5 w-5' />
            Добавление картриджа в реестр
          </DialogTitle>
          <DialogDescription>Заполните номер и выберите модель картриджа</DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-3 '>
              <FormInput
                name='number'
                label='Номер картриджа'
                placeholder='Например, МК101'
                required
              />
              <FormSelectWithSearch<Model>
                name='modelId'
                label='Модель'
                required
                options={models}
                error={'Необходимо выбрать модель из списка'}
                onAdd={() => setOpenModal(true)}
                addLabel='Добавить модель'
                getOptionLabel={(m) => m.model}
                getOptionValue={(m) => m.id}
                placeholder='Выберите модель из списка'
              />

              <FormSelect required name='status' label='Состояние картриджа' />
            </div>

            <div className='pt-4 flex justify-end gap-8'>
              <Button onClick={() => onOpenChange(false)} type='button' variant='outline'>
                Отмена
              </Button>
              <Button type='submit'>Сохранить</Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
