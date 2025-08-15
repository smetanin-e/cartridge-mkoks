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

// Массив доступных моделей картриджей
const MODELS = [
  { id: 1, name: 'CE505A' },
  { id: 2, name: 'CF280A' },
  { id: 3, name: 'CB435A' },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePrinter: React.FC<Props> = ({ open, onOpenChange }: Props) => {
  const form = useForm({
    defaultValues: {
      printer: '',
      models: [] as number[],
    },
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const payload = {
        name: data.printer,
        models: data.models.map((id: number) => ({ id })),
      };
      console.log(payload);

      toast.success('Модель картриджа добавлена в реестр', {
        icon: '✅',
      });
      form.reset({
        printer: '',
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
              name='printer'
              label='Модель принтера'
              placeholder='Например, HP LaserJet Pro M404dn'
              required
            />

            {/* Выбор существующих моделей */}
            {MODELS.length > 0 && (
              <div>
                <Label className='font-semibold'>Выберите совместимые модели картриджей</Label>
                <Card className='mt-2'>
                  <CardContent className='p-4'>
                    <div className='grid grid-cols-2 gap-3'>
                      {MODELS.map((model) => (
                        <div key={model.id} className='flex items-center space-x-2'>
                          <FormCheckbox name='models' label={model.name} value={model.id} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Добавление новой модели */}

            {/* Выбранные модели */}

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
                    <TableCell className='font-medium'>{form.watch('printer') || '—'}</TableCell>
                    <TableCell>
                      <div className='flex flex-wrap gap-1'>
                        {form.watch('models')?.length > 0 ? (
                          form.watch('models').map((id: number) => {
                            const model = MODELS.find((m) => m.id === id);
                            if (!model) return null;
                            return (
                              <Badge
                                key={model.id}
                                variant='secondary'
                                className='flex flex-wrap gap-1'
                              >
                                {model.name}
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
            <Label className='font-semibold'>Результат добавления:</Label>
            <div className='grid grid-cols-2 gap-4'>
              <p className='font-medium col-auto'>
                {form.watch('printer') || '—'} {/* если пусто, показываем тире */}
              </p>
              <div className='flex flex-wrap gap-2 items-center'>
                {form.watch('models')?.length > 0 ? (
                  form.watch('models').map((id: number) => {
                    const model = MODELS.find((m) => m.id === id);
                    if (!model) return null;
                    return (
                      <Badge
                        key={model.id}
                        variant='secondary'
                        className='flex items-center gap-1 pr-1'
                      >
                        {model.name}
                      </Badge>
                    );
                  })
                ) : (
                  <span className='text-gray-500 text-sm'>модели не выбраны</span>
                )}
              </div>
            </div>
            <div>
              <Label className='text-base font-semibold'>Выбранные модели ({4})</Label>
              <div className='flex flex-wrap gap-2 mt-2'>
                {MODELS.map((modelName) => (
                  <Badge
                    key={modelName.id}
                    variant='secondary'
                    className='flex items-center gap-1 pr-1'
                  >
                    {modelName.name}
                  </Badge>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button type='button' variant='outline'>
                Отмена
              </Button>
              <Button
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
