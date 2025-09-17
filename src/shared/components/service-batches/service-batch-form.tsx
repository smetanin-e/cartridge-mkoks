'use client';
import React from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { Send } from 'lucide-react';
import { FormDate, FormInput, FormTextarea } from '@/shared/components/form';
import { FormProvider, useForm } from 'react-hook-form';

import { convertDate } from '@/shared/lib';
import { ServiceFormType, serviceSchema } from '@/shared/schemas/service-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { sendToService } from '@/shared/services/batch';

interface Props {
  className?: string;
  selectedCartridges: number[];
  setSelectedCartridges: (selectedCartridges: number[]) => void;
}

export const ServiceBatchForm: React.FC<Props> = ({
  selectedCartridges,
  setSelectedCartridges,
}) => {
  const form = useForm<ServiceFormType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      notes: '',
      responsible: '',
    },
  });

  const onSubmit = async (data: ServiceFormType) => {
    try {
      data.date = convertDate(data.date);
      const placeholder = { ...data, cartridges: selectedCartridges };
      console.log(placeholder);
      await sendToService(placeholder);
      setSelectedCartridges([]);
      toast.success('Партия создана', {
        icon: '✅',
      });

      form.reset({
        date: new Date().toISOString().split('T')[0],
        notes: '',
        responsible: '',
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error [SERVICE_BATCH_FORM]', error);
        return toast.error(error.message, { icon: '❌' });
      }
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Данные партии</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4 '>
              <FormDate name='date' label='Дата отправки' required />

              <FormInput name='responsible' label='Ответственный' required />
              <FormTextarea
                name='notes'
                label='Примечания'
                placeholder='Дополнительная информация...'
              />

              <div className='pt-4 border-t'>
                <div className='text-sm text-muted-foreground mb-4'>
                  Выбрано картриджей: <strong>{selectedCartridges.length}</strong>
                </div>
                <Button type='submit' className='w-full' disabled={selectedCartridges.length === 0}>
                  <Send className='h-4 w-4 mr-2' />
                  Отправить в сервис
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
};
