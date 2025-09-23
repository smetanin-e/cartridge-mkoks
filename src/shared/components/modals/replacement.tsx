'use client';
import React from 'react';
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui';
import { Package } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateDepartament, FormCustomSelect, FormDate, FormInput } from '@/shared/components';
import { CartridgeDTO } from '@/shared/services/dto/cartridge-model.dto.';
import { Departament } from '@prisma/client';
import { convertDate } from '@/shared/lib';
import { ReplacementFormType, replacementSchema } from '@/shared/schemas/replacement-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { replacing } from '@/shared/services/replacement';

import { getStatusBadge } from '@/shared/components/utils';

interface Props {
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;

  avaibleCartridges: CartridgeDTO[];
  workingCartridges: CartridgeDTO[];
  departaments: Departament[];
  setPopupDepartament: (value: boolean) => void;
  setSubmiting: (value: boolean) => void;
}

export const Replacement: React.FC<Props> = ({
  open,
  onOpenChange,
  avaibleCartridges,
  workingCartridges,
  departaments,
  setSubmiting,
}) => {
  const form = useForm<ReplacementFormType>({
    resolver: zodResolver(replacementSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      installedCartridge: null,
      removedCartridge: null,
      responsible: '',
    },
  });

  const onSubmit = async (data: ReplacementFormType) => {
    try {
      setSubmiting(true);
      data.date = convertDate(data.date);
      console.log(data);
      await replacing(data);
      onOpenChange(false);
      toast.success('Замена оформлена', {
        icon: '✅',
      });

      form.reset({
        date: new Date().toISOString().split('T')[0],
        installedCartridge: null,
        removedCartridge: null,
        responsible: '',
      });
      setSubmiting(false);
    } catch (error) {
      setSubmiting(false);
      if (error instanceof Error) {
        console.log('Error [REPLACEMENT_FORM]', error);
        return toast.error(error.message, { icon: '❌' });
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                onAdd={<CreateDepartament />}
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

              <Button type='submit'>Подтвердить</Button>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};
