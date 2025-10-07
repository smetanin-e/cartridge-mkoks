import React from 'react';
import toast from 'react-hot-toast';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { Check, CircleX, TriangleAlert, X } from 'lucide-react';

import { deletePrinter } from '@/app/(main)/cartridges/actions';
import { usePrintersStore } from '../../store/printers';
interface Props {
  className?: string;
  id: number;
}

export const DeletePrinter: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = React.useState(false);

  const deletePrinterById = async (id: number) => {
    try {
      setOpen(false);
      await deletePrinter(id);
      usePrintersStore.getState().getPrinters();
      toast.success('Запись о принтере удалена ✅');
    } catch (error) {
      console.log('Error [deletePrinterById]', error);
      return toast.error(error instanceof Error ? error.message : 'Ошибка удаления принтера ❌');
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className='flex items-center justify-center'>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <CircleX className='h-4 w-4' />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent align='end'>
        <div className='flex items-center gap-3 pb-2 text-sm'>
          {' '}
          <TriangleAlert size={50} color='orange' />
          Подтверждение удаления!
        </div>
        <div className='flex gap-3 justify-center'>
          <Button variant='outline' size='sm' onClick={() => deletePrinterById(id)}>
            <Check />
            Удалить
          </Button>
          <Button variant='outline' size='sm' onClick={() => setOpen(false)}>
            <X />
            Отмена
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
