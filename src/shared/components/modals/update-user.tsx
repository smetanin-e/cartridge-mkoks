'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { PencilLine, UserPlus } from 'lucide-react';
import React from 'react';
import { UpdateUserForm } from '../form';
import { Agent } from '@/shared/services/dto/agent.dto';

interface Props {
  className?: string;
  user: Agent;
}

export const UpdateUser: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <PencilLine className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <UserPlus className='h-5 w-5' />
            Обновление данных пользователя
          </DialogTitle>
        </DialogHeader>

        <UpdateUserForm setOpen={setOpen} user={user} />
      </DialogContent>
    </Dialog>
  );
};
