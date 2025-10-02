'use client';
import React from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { Check, Trash2, TriangleAlert, X } from 'lucide-react';
import { BatchCartridges } from '../services/dto/service-batch.dto';
interface Props {
  className?: string;
  cartridges: BatchCartridges[];
  id: string;
}

export const BatchCancel: React.FC<Props> = ({ cartridges, id }) => {
  const [open, setOpen] = React.useState(false);
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
          <Button variant='outline' size='sm' onClick={() => console.log(cartridges)}>
            <Check />
            Удалить
          </Button>
          <Button variant='outline' size='sm'>
            <X />
            Отмена
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
