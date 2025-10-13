'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { Send } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { FormDate, FormInput, FormTextarea, ResponsibleForm } from '@/shared/components/form';
import { FormProvider, useForm } from 'react-hook-form';
import { convertDate } from '@/shared/lib';
import { ServiceFormType, serviceSchema } from '@/shared/schemas/service-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendToService } from '@/shared/services/batch';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  className?: string;
  selectedCartridges: number[];
  setSelectedCartridges: (selectedCartridges: number[]) => void;
}

export const CreateBatchForm: React.FC<Props> = ({ selectedCartridges, setSelectedCartridges }) => {
  const [isSubmiting, setIsSubmiting] = React.useState(false);
  const queryClient = useQueryClient();
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
      setIsSubmiting(true);
      data.date = convertDate(data.date);
      const placeholder = { ...data, cartridges: selectedCartridges };
      await sendToService(placeholder);

      queryClient.invalidateQueries({ queryKey: ['batches'] });
      queryClient.invalidateQueries({ queryKey: ['cartridges'] });

      setSelectedCartridges([]);
      toast.success('Партия создана ✅');

      form.reset();
    } catch (error) {
      console.log('Error [CREATE_BATCH_FORM]', error);
      toast.error(error instanceof Error ? error.message : 'Не удалось создать партию ❌');
    } finally {
      setIsSubmiting(false);
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

              <ResponsibleForm />
              <FormTextarea
                name='notes'
                label='Примечания'
                placeholder='Дополнительная информация...'
              />

              <div className='pt-4 border-t'>
                <div className='text-sm text-muted-foreground mb-4'>
                  Выбрано картриджей: <strong>{selectedCartridges.length}</strong>
                </div>
                <Button
                  type='submit'
                  className='w-full'
                  disabled={selectedCartridges.length === 0 || isSubmiting}
                >
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
