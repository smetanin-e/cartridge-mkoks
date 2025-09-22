'use client';
import React from 'react';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui';
import { Package } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormDate, FormInput, FormSelectWithSearch } from '@/shared/components';
import { CartridgeDTO } from '@/shared/services/dto/cartridge-model.dto.';
import { Departament } from '@prisma/client';
import { convertDate } from '@/shared/lib';
import { ReplacementFormType, replacementSchema } from '@/shared/schemas/replacement-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { replacing } from '@/shared/services/replacement';
import { CustomSelect } from '../form/custom-select';

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
  setPopupDepartament,
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
              <FormSelectWithSearch<Departament>
                name={'departamentId'}
                label='Подразделение'
                options={departaments}
                getOptionValue={(d) => d.id}
                getOptionLabel={(d) => d.name}
                placeholder='Укажите подразделение'
                required
                onAdd={() => setPopupDepartament(true)}
                addLabel='Добавить подразделение'
                error='Укажите подразделение'
              />

              <FormSelectWithSearch<CartridgeDTO>
                name={'installedCartridge'}
                label='Установленный картридж'
                options={avaibleCartridges}
                getOptionValue={(c) => c.number}
                getOptionLabel={(c) => `${c.number}`}
                placeholder='-'
              />
              {/*  (${c.model!.model}) */}
              <FormSelectWithSearch<CartridgeDTO>
                name={'removedCartridge'}
                label='Снятый картридж'
                options={workingCartridges}
                getOptionValue={(c) => c.number}
                getOptionLabel={(c) => `${c.number}`}
                placeholder='-'
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
