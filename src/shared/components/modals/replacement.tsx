'use client';
import React from 'react';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui';
import { Package } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormDate, FormSelectWithSearch } from '@/shared/components';
import { CartridgeDTO } from '@/shared/services/dto/cartridge-model.dto.';

interface Props {
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  avaibleCartridges: any;
  workingCartridges: any;
}

export const Replacement: React.FC<Props> = ({
  open,
  onOpenChange,
  avaibleCartridges,
  workingCartridges,
}) => {
  const form = useForm<any>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
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
              <FormSelectWithSearch<CartridgeDTO>
                name={'installedCartridge'}
                label='Установленный картридж'
                options={avaibleCartridges}
                getOptionValue={(c) => c.id}
                getOptionLabel={(c) => `${c.number} (${c.model!.model})`}
                placeholder='----------------'
              />

              <FormSelectWithSearch<CartridgeDTO>
                name={'removedCartridge'}
                label='Снятый картридж'
                options={workingCartridges}
                getOptionValue={(c) => c.id}
                getOptionLabel={(c) => `${c.number} (${c.model!.model})`}
                placeholder='----------------'
              />

              <Button type='submit'>Подтвердить</Button>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};
