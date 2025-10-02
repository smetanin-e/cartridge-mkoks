import React from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { Check, CircleX, TriangleAlert, X } from 'lucide-react';
import { deletePrinter } from '../services/printers';
import toast from 'react-hot-toast';
interface Props {
  className?: string;
  id: number;
}

export const DeletePrinter: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const removePrinter = async (id: number) => {
    setOpen(false);
    await deletePrinter(id);
    toast.success('Запись о принтере удалена', {
      icon: '✅',
    });
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
          <Button variant='outline' size='sm' onClick={() => removePrinter(id)}>
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
