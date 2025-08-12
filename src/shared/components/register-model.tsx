'use client';

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { Package, Plus } from 'lucide-react';
import { CartridgeModel } from '@/app/cartridges/page';
import { FormInput } from '@/shared/components';
import { FormProvider, useForm } from 'react-hook-form';
import { FormRegisterModelType, registerModelSchema } from '../schemas/register-model-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useModelsStore } from '../store/cartridge-models';
import React from 'react';
import { createModel } from '../services/models';

interface Props {
  className?: string;
}

const initialCartridgeModels: CartridgeModel[] = [
  { id: 'm1', name: 'CE505A' },
  { id: 'm2', name: 'CF280A' },
  { id: 'm3', name: 'CB435A' },
  { id: 'm4', name: 'HP 12A' },
];

export const RegisterModel: React.FC<Props> = () => {
  const { models, getModels } = useModelsStore();

  React.useEffect(() => {
    getModels();
  }, []);

  console.log(models);

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
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error [ADD_MODEL_FORM]', error);
        return toast.error(error.message, { icon: '❌' });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Package className='h-5 w-5' />
          Добавить модель картриджа
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
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
              {/* {models.map(
                (model) =>
                  model.cartridges &&
                  model.cartridges.length > 0 && (
                    <Badge key={model.id} variant='secondary'>
                      {model.model}
                    </Badge>
                  ),
              )} */}

              {models.map((model) => (
                <Badge key={model.id} variant='secondary'>
                  {model.model}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
