import React from 'react';
import toast from 'react-hot-toast';

import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { Check, CircleX, TriangleAlert, X } from 'lucide-react';

import { deleteCartridge } from '@/app/(main)/cartridges/actions';
import { useQueryClient } from '@tanstack/react-query';
interface Props {
  className?: string;
  id: number;
}

export const DeleteCartridge: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const deleteCartridgeById = async (id: number) => {
    try {
      setOpen(false);
      const res = await deleteCartridge(id);

      if (!res.success && res.message) {
        toast.error(res.message); // или alert(res.message)
        return;
      }

      // Обновляем все списки картриджей
      queryClient.invalidateQueries({ queryKey: ['cartridges'] });
      toast.success('Картридж удален ✅');
    } catch (error) {
      console.log('Error [deleteCartridgeById]', error);
      return toast.error(error instanceof Error ? error.message : 'Ошибка удаления Картриджа ❌');
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className='flex items-center justify-center'>
          <Button variant='ghost' className='h-8 w-8 p-0 '>
            <CircleX className='h-4 w-4' color='grey' />
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
          <Button variant='outline' size='sm' onClick={() => deleteCartridgeById(id)}>
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
