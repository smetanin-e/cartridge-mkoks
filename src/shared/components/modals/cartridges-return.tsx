'use client';
import React from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { BatchCartridges } from '@/shared/services/dto/service-batch.dto';
import { ChoiceCartridges, FormDate, FormInput, FormTextarea } from '@/shared/components';
import { FormProvider, useForm } from 'react-hook-form';
import { convertDate } from '@/shared/lib';
import { ServiceFormType, serviceSchema } from '@/shared/schemas/service-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { returnCartriges } from '@/app/service-return/actions';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  className?: string;
  batchId: string;
  date: string;
  responsible: string;
  status: React.ReactNode;
  cartridges: BatchCartridges[];
}

export const CartridgesReturn: React.FC<Props> = ({
  date,
  responsible,
  status,
  cartridges,
  batchId,
}) => {
  const queryClient = useQueryClient();
  const [selectedCartridges, setSelectedCartridges] = React.useState<number[]>([]);
  const [open, setOpen] = React.useState(false);
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
      const payload = {
        ...data,
        batchId: batchId,
        cartridges: selectedCartridges,
      };
      await returnCartriges(payload);

      // 🔥 Обновляем все списки useBatchList
      queryClient.invalidateQueries({ queryKey: ['batches'] });
      toast.success('Прием картриджей успешно обработан', {
        icon: '✅',
      });

      setOpen(false);
      setSelectedCartridges([]);
      form.reset({
        date: new Date().toISOString().split('T')[0],
        notes: '',
        responsible: '',
      });
      console.log(payload);
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error [SERVICE_BATCH_FORM]', error);
        return toast.error(error.message, { icon: '❌' });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>Принять</Button>
      </DialogTrigger>
      <DialogContent className='max-w-6xl sm:max-w-auto'>
        <DialogHeader>
          <DialogTitle>Прием партии от {date}</DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Информация о партии */}
          <div className='grid grid-cols-2 gap-4 text-sm bg-muted p-4 rounded-lg'>
            <div>
              <strong>Дата отправки:</strong> {date}
            </div>
            <div>
              <strong>Ответственный за отправку:</strong> {responsible}
            </div>
            <div className='flex items-center gap-4'>
              <strong>Статус:</strong> <p>{status}</p>
            </div>
            <div>
              <strong>Всего картриджей:</strong> {cartridges.length}
            </div>
          </div>

          {/* Выбор картриджей */}
          <ChoiceCartridges
            cartridges={cartridges}
            selectedCartridges={selectedCartridges}
            setSelectedCartridges={setSelectedCartridges}
          />
          {/* Форма приема */}
          <FormProvider {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid grid-cols-2 gap-4'>
                <FormDate name='date' label='Дата приема' />
                <div>
                  <FormInput
                    name='responsible'
                    label='Ответственный за прием'
                    placeholder='ФИО ответственного'
                  />
                </div>
              </div>
              <div>
                <FormTextarea
                  name='notes'
                  label='Примечания'
                  placeholder='Комментарий возврата...'
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type='button' variant='outline'>
                    Отмена
                  </Button>
                </DialogClose>

                <Button type='submit' disabled={selectedCartridges.length === 0}>
                  Принять
                  {selectedCartridges.length !== 0 ? ` (${selectedCartridges.length} шт.)` : ''}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};
