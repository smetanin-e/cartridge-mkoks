'use client';

import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui';
import { Package, Plus } from 'lucide-react';
import { FormInput } from '@/shared/components';
import { FormProvider, useForm } from 'react-hook-form';
import { FormRegisterModelType, registerModelSchema } from '../../schemas/register-model-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import React from 'react';
import { createModel } from '../../services/models';
import { useModelsStore } from '@/shared/store/cartridge-models';

interface Props {
  className?: string;
}

export const RegisterModel: React.FC<Props> = () => {
  const { models, getModels, openModal, setOpenModal } = useModelsStore(); //!ИСПРАВИТЬ

  React.useEffect(() => {
    getModels();
  }, []);

  const form = useForm<FormRegisterModelType>({
    resolver: zodResolver(registerModelSchema),
    defaultValues: {
      model: '',
    },
  });

  const onSubmit = async (data: FormRegisterModelType) => {
    try {
      console.log(data);
      await createModel(data);
      toast.success('Модель картриджа добавлена в реестр', {
        icon: '✅',
      });
      form.reset({
        model: '',
      });
      setOpenModal(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error [ADD_MODEL_FORM]', error);
        return toast.error(error.message, { icon: '❌' });
      }
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className='space-y-4'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Package className='h-5 w-5' />
            Добавить модель картриджа
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-3 '>
              <FormInput
                name='model'
                label='Модель картриджа'
                placeholder='Например, CE505X'
                required
              />
            </div>
            <div className='pt-4 flex justify-end'>
              <Button type='submit' className='w-[250px]'>
                <Plus className='h-4 w-4 mr-2' />
                Добавить модель
              </Button>
            </div>
          </form>
        </FormProvider>

        {models.length > 0 && (
          <div className='mt-4'>
            <h3 className='text-md font-semibold mb-2'>Существующие модели:</h3>
            <div className='flex flex-wrap gap-2'>
              {models.map((model) => (
                <Badge key={model.id} variant='secondary'>
                  {model.model}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
