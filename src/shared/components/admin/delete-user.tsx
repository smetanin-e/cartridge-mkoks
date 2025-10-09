'use client';
import React from 'react';
import { Button, Popover, PopoverContent, PopoverTrigger } from '../ui';
import { Check, Trash2, TriangleAlert, X } from 'lucide-react';
import { deleteAgent } from '@/app/(main)/admin/actions';
import toast from 'react-hot-toast';
import { useAgentStore } from '@/shared/store/agents';

interface Props {
  className?: string;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  currentUserId: number;
  id: number;
}

export const DeleteUser: React.FC<Props> = ({ id, currentUserId, loading, setLoading }) => {
  const [open, setOpen] = React.useState(false);

  const deleteUser = async (id: number, currentUserId: number) => {
    try {
      setLoading(true);
      const res = await deleteAgent(id, currentUserId);
      if (res?.message) {
        setOpen(false);
        toast.error(res.message);
        return;
      }
      useAgentStore.getState().getAgents();
      toast.success('Пользователь удален ✅');
    } catch (error) {
      console.error(error, '[Server error] Ошибка удаления пользователя');
      toast.error('Ошибка удаления пользователя');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className='flex items-center justify-center'>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <Trash2 className='h-4 w-4' />
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
          <Button
            disabled={loading}
            variant='outline'
            size='sm'
            onClick={() => deleteUser(id, currentUserId)}
          >
            <Check />
            Удалить
          </Button>
          <Button disabled={loading} variant='outline' size='sm' onClick={() => setOpen(false)}>
            <X />
            Отмена
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
