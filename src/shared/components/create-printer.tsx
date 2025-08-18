'use client';
import React from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { PrinterIcon } from 'lucide-react';
import { FormCheckbox, FormInput } from '@/shared/components';
import toast from 'react-hot-toast';
import { FormProvider, useForm } from 'react-hook-form';
import { registerPrinter } from '../services/printers';
import { useModelsStore } from '../store/cartridge-models';

type FormDataType = {
  name: string;
  models: number[];
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePrinter: React.FC<Props> = ({ open, onOpenChange }: Props) => {
  const { models } = useModelsStore();

  const form = useForm({
    defaultValues: {
      name: '',
      models: [] as number[],
    },
  });

  const onSubmit = async (data: FormDataType) => {
    try {
      const payload = {
        name: data.name,
        models: data.models.map((id: number) => ({ id })),
      };

      await registerPrinter(payload);

      toast.success('Модель картриджа добавлена в реестр', {
        icon: '✅',
      });
      form.reset({
        name: '',
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
          <DialogDescription>
            Заполните название принтера и выберите совместимые картриджи
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              name='name'
              label='Модель принтера'
              placeholder='Например, HP LaserJet Pro M404dn'
              required
            />

            {/* Выбор существующих моделей */}
            {models.length > 0 && (
              <div>
                <Label className='font-semibold'>Выберите совместимые модели картриджей</Label>
                <Card className='mt-2'>
                  <CardContent className='p-4'>
                    <div className='grid grid-cols-2 gap-3'>
                      {models.map((model) => (
                        <div key={model.id} className='flex items-center space-x-2'>
                          <FormCheckbox name='models' label={model.model} value={model.id} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Добавление новой модели */}

            {/* Выбранные модели */}
            <Label className='font-semibold'>Предварительный просмотр:</Label>
            <div>
              <Table>
                <TableHeader className='bg-muted/50'>
                  <TableRow>
                    <TableHead>Название принтера</TableHead>
                    <TableHead>Совместимые модели</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className='font-medium bg-gray-200'>
                      {form.watch('name') || '—'}
                    </TableCell>
                    <TableCell className='bg-gray-200'>
                      <div className='flex flex-wrap gap-1'>
                        {form.watch('models')?.length > 0 ? (
                          form.watch('models').map((id: number) => {
                            const model = models.find((m) => m.id === id);
                            if (!model) return null;
                            return (
                              <Badge
                                key={model.id}
                                variant='secondary'
                                className='flex flex-wrap gap-1'
                              >
                                {model.model}
                              </Badge>
                            );
                          })
                        ) : (
                          <span className='text-gray-500 text-sm'>модели не выбраны</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <DialogFooter>
              <Button onClick={() => onOpenChange(false)} type='button' variant='outline'>
                Отмена
              </Button>
              <Button
                onClick={() => onOpenChange(false)}
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
