'use client';
import React, { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from '@/shared/components/ui';
import { PrinterIcon, X } from 'lucide-react';
import { FormCheckbox, FormInput } from '@/shared/components';
import toast from 'react-hot-toast';
import { FormProvider, useForm } from 'react-hook-form';

// Массив доступных моделей картриджей
const MODELS = [
  { id: 1, name: 'CE505A' },
  { id: 2, name: 'CF280A' },
  { id: 3, name: 'CB435A' },
  { id: 4, name: 'HP 12A' },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePrinter: React.FC<Props> = ({ open, onOpenChange }: Props) => {
  const form = useForm({
    defaultValues: {
      printer: '',
      models: [] as number[],
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const payload = {
        name: data.printer,
        models: data.models.map((id: number) => ({ id })),
      };
      console.log(payload);

      toast.success('Модель картриджа добавлена в реестр', {
        icon: '✅',
      });
      form.reset({
        printer: '',
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error [ADD_PRINTER_FORM]', error);
        return toast.error(error.message, { icon: '❌' });
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <PrinterIcon className='h-5 w-5' />
            Добавить новый принтер
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              name='printer'
              label='Модель принтера'
              placeholder='Например, HP LaserJet Pro M404dn'
              required
            />

            {/* Выбор существующих моделей */}
            {MODELS.length > 0 && (
              <div>
                <Label className='text-base font-semibold'>
                  Выберите совместимые модели картриджей
                </Label>
                <Card className='mt-2'>
                  <CardContent className='p-4'>
                    <div className='grid grid-cols-2 gap-3'>
                      {MODELS.map((model) => (
                        <div key={model.id} className='flex items-center space-x-2'>
                          <FormCheckbox name='models' label={model.name} value={model.id} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Добавление новой модели */}

            {/* Выбранные модели */}

            <div>
              <Label className='text-base font-semibold'>Выбранные модели ({4})</Label>
              <div className='flex flex-wrap gap-2 mt-2'>
                {MODELS.map((modelName) => (
                  <Badge
                    key={modelName.id}
                    variant='secondary'
                    className='flex items-center gap-1 pr-1'
                  >
                    {modelName.name}
                  </Badge>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button type='button' variant='outline'>
                Отмена
              </Button>
              <Button
                type='submit'
                disabled={!form.watch('models') || form.watch('models').length === 0}
              >
                Добавить принтер
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
