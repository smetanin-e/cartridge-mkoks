import React from 'react';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui';
import { Building2, Plus } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { createDepartamentSchema, FormDepartamentType } from '@/shared/schemas/departament-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../form';
import toast from 'react-hot-toast';
import { createDepartament } from '@/shared/services/departaments';
interface Props {
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateDepartament: React.FC<Props> = ({ open, onOpenChange }) => {
  const form = useForm<FormDepartamentType>({
    resolver: zodResolver(createDepartamentSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (data: FormDepartamentType) => {
    try {
      console.log(data);
      await createDepartament(data);
      toast.success('Подразделение добавлено в реестр', {
        icon: '✅',
      });
      form.reset({
        name: '',
      });
      onOpenChange(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error [ADD_DEPARTAMENT_FORM]', error);
        return toast.error(error.message, { icon: '❌' });
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='space-y-4'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Building2 className='h-5 w-5' />
            Добавить модель картриджа
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-3 '>
              <FormInput
                name='name'
                label='Подразделение'
                placeholder='Например, Бухгалтерия (Отдел учета запасов)'
                required
              />
            </div>
            <div className='pt-4 flex justify-end'>
              <Button type='submit' className='w-[250px]'>
                <Plus className='h-4 w-4 mr-2' />
                Добавить подразделение
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
