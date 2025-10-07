import React from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui';
import { MoreHorizontal } from 'lucide-react';
import { CARTRIDGE_STATUS_CONFIG } from '../../constants';
import { getStatusBadge } from '../utils';
import { CartridgeStatus } from '@prisma/client';
import { changeCartridgeStatus } from '@/app/(main)/cartridges/actions';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  className?: string;
  id: number;
  currentStatus: CartridgeStatus;
}

export const CartridgeActions: React.FC<Props> = ({ id, currentStatus }) => {
  const queryClient = useQueryClient();
  const updateStatus = async (id: number, status: CartridgeStatus) => {
    try {
      await changeCartridgeStatus(id, status);
      queryClient.invalidateQueries({ queryKey: ['cartridges'] });
      toast.success('Статус изменён');
    } catch (error) {
      console.error('[changeCartridgeStatus]', error);
      toast.error(error instanceof Error ? error.message : 'Не удалось изменить статус ❌');
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {Object.entries(CARTRIDGE_STATUS_CONFIG)
          .filter(([s]) => s !== currentStatus)
          .map(([status]) => (
            <DropdownMenuItem
              key={status}
              onClick={() => updateStatus(id, status as CartridgeStatus)}
            >
              {getStatusBadge(status as CartridgeStatus)}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
