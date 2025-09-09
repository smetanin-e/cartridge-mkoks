'use client';
import React from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { Send } from 'lucide-react';
import { FormDate, FormInput, FormTextarea } from './form';
import { FormProvider, useForm } from 'react-hook-form';
import { useServiceBatchStore } from '../store/service-batch';
import { convertDate } from '../lib';

interface Props {
  className?: string;
}

export const ServiceBatchForm: React.FC<Props> = () => {
  const { selectedCartridges } = useServiceBatchStore();
  const form = useForm({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: any) => {
    data.date = convertDate(data.date);
    const placeholder = { ...data, cartridges: selectedCartridges };
    console.log(placeholder);
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Данные партии</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
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
