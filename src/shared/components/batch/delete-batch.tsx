'use client';
import React from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { Check, Trash2, TriangleAlert, X } from 'lucide-react';
import { BatchCartridges } from '../../services/dto/service-batch.dto';
import { batchCancel } from '@/app/(main)/service-batch/actions';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
interface Props {
  className?: string;
  cartridges: BatchCartridges[];
  id: string;
}

export const DeleteBatch: React.FC<Props> = ({ cartridges, id }) => {
  const [open, setOpen] = React.useState(false);
  const cartridgesIds = cartridges.map((c) => c.id);

  const queryClient = useQueryClient();

  const removeBatch = async (id: string, cartridgeIds: number[]) => {
    try {
      setOpen(false);
      await batchCancel(id, cartridgeIds);

      // Обновляем все списки useBatchList
      queryClient.invalidateQueries({ queryKey: ['batches'] });

      // Обновляем все списки картриджей
      queryClient.invalidateQueries({ queryKey: ['cartridges'] });
      toast.success('Партия отменена');
    } catch (error) {
      console.error('Не удалось удалить партию', error);
      toast.error('Не удалось удалить партию');
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className='flex items-center justify-center'>
          <Button variant={'outline'}>
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent align='end'>
        <div className='flex items-center gap-3 pb-2 text-sm'>
          {' '}
          <TriangleAlert size={50} color='orange' />
          Отменить партию?
        </div>
        <div className='flex gap-3 justify-center'>
          <Button variant='outline' size='sm' onClick={() => removeBatch(id, cartridgesIds)}>
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
