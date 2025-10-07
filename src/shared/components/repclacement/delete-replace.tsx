import React from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { Check, CircleX, TriangleAlert, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { removeReplace } from '@/app/(main)/replacement/actions';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  className?: string;
  id: number;
}

export const DeleteReplace: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const deleteReplace = async (id: number) => {
    try {
      setOpen(false);
      const res = await removeReplace(id);

      if (res?.error) {
        toast.error(res.error);
        return;
      }
      // Обновляем все списки замен и картриджей
      queryClient.invalidateQueries({ queryKey: ['replacements'] });
      queryClient.invalidateQueries({ queryKey: ['cartridges'] });

      toast.success('Запись о замене отменена', {
        icon: '✅',
      });
    } catch (error) {
      console.error(error, 'Не удалось отменить запись');
      toast.error('Эту запись отменить невозможно');
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
          Отменить текущую замену?
        </div>
        <div className='flex gap-3 justify-center'>
          <Button variant='outline' size='sm' onClick={() => deleteReplace(id)}>
            <Check />
            Подтвердить
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
