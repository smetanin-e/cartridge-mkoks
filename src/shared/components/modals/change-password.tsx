import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui';
import { ChangePasswordForm } from '../form';
import { KeyRound } from 'lucide-react';

interface Props {
  className?: string;
  id: number;
}

export const ChangePassword: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <KeyRound className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-sm'>
        <DialogHeader className='space-y-1'>
          <DialogTitle className='text-2xl font-bold text-center'>Смена пароля</DialogTitle>
          <DialogDescription className='text-center'>
            Введите текущий и новый пароль, чтобы обновить свой аккаунт.
          </DialogDescription>
        </DialogHeader>
        <ChangePasswordForm id={id} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
