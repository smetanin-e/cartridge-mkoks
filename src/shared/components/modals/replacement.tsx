'use client';
import React from 'react';
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { Edit, Package, Plus } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormCustomSelect, FormDate, FormInput } from '@/shared/components';
import { CartridgeDTO } from '@/shared/services/dto/cartridge-model.dto.';
import { Departament } from '@prisma/client';
import { convertDate } from '@/shared/lib';
import { ReplacementFormType, replacementSchema } from '@/shared/schemas/replacement-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { replacing } from '@/shared/services/replacement';

import { getStatusBadge } from '@/shared/components/utils';
import { useDepartamentStore } from '@/shared/store/departaments';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  className?: string;
  avaibleCartridges: CartridgeDTO[];
  workingCartridges: CartridgeDTO[];
}

export const Replacement: React.FC<Props> = ({ avaibleCartridges, workingCartridges }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [isSubmiting, setIsSubmiting] = React.useState(false);
  const { departaments, getDepartaments } = useDepartamentStore();
  const { setOpenModal } = useDepartamentStore();

  const form = useForm<ReplacementFormType>({
    resolver: zodResolver(replacementSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      installedCartridge: null,
      removedCartridge: null,
      responsible: '',
    },
  });

  React.useEffect(() => {
    getDepartaments();
  }, []);

  const onSubmit = async (data: ReplacementFormType) => {
    try {
      setIsSubmiting(true);

      data.date = convertDate(data.date);
      await replacing(data);

      // Обновляем все списки useBatchList
      queryClient.invalidateQueries({ queryKey: ['replacements'] });

      setOpen(false);
      toast.success('Замена оформлена ✅');

      form.reset({
        date: new Date().toISOString().split('T')[0],
        installedCartridge: null,
        removedCartridge: null,
        responsible: '',
      });
    } catch (error) {
      console.log('Error [REPLACEMENT_FORM]', error);
      toast.error(error instanceof Error ? error.message : 'Ошибка добавления');
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='flex items-center gap-2'>
          <Edit className='h-4 w-4' />
          Замена картриджа
        </Button>
      </DialogTrigger>
      <DialogContent className='space-y-4'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Package className='h-5 w-5' />
            Замена картриджа
          </DialogTitle>
        </DialogHeader>

        <div>
          <FormProvider {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
              <FormDate name='date' required />
              <FormCustomSelect<Departament>
                name={'departamentId'}
                label='Подразделение'
                required
                error='Нужно указать подразделение'
                items={departaments}
                placeholder='Укажите подразделение'
                getKey={(c) => c.id}
                getLabel={(c) => c.name}
                renderValue={(c) => c.name}
                renderItem={(c) => c.name}
                onAdd={
                  <Button
                    type='button'
                    variant={'outline'}
                    size={'sm'}
                    onClick={() => setOpenModal(true)}
                  >
                    <Plus className='h-4 w-4 mr-2' />
                    Добавить
                  </Button>
                }
              />

              <FormCustomSelect<CartridgeDTO>
                name={'installedCartridge'}
                label='Установленный картридж'
                items={avaibleCartridges}
                placeholder='---'
                getKey={(c) => c.id}
                getLabel={(c) => c.number}
                renderValue={(c) => (
                  <div className='flex gap-2 items-center flex-1'>
                    <span>{c.number}</span>
                    <Badge variant='secondary'>{c.model?.model}</Badge>
                    {getStatusBadge(c.status)}
                  </div>
                )}
                renderItem={(c) => (
                  <div className='grid grid-cols-[auto_1fr_auto] items-center gap-2 w-full'>
                    <div>{c.number}</div>
                    <Badge variant='outline'>
                      <strong>{c.model?.model}</strong>
                    </Badge>
                    <div>{getStatusBadge(c.status)}</div>
                  </div>
                )}
              />

              <FormCustomSelect<CartridgeDTO>
                name={'removedCartridge'}
                label='Снятый картридж'
                items={workingCartridges}
                placeholder='---'
                getKey={(c) => c.id}
                getLabel={(c) => c.number}
                renderValue={(c) => (
                  <div className='flex gap-2 items-center flex-1'>
                    <span>{c.number}</span>
                    <Badge variant='secondary'>{c.model?.model}</Badge>
                    {getStatusBadge(c.status)}
                  </div>
                )}
                renderItem={(c) => (
                  <div className='grid grid-cols-[auto_1fr_auto] items-center gap-2 w-full'>
                    <div>{c.number}</div>
                    <Badge variant='outline'>
                      <strong>{c.model?.model}</strong>
                    </Badge>
                    <div>{getStatusBadge(c.status)}</div>
                  </div>
                )}
              />

              <FormInput name='responsible' label='Ответственный' required />

              <Button disabled={isSubmiting} type='submit'>
                Подтвердить
              </Button>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};
