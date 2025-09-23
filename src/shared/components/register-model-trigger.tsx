import React from 'react';
import { Button } from './ui';
import { Plus } from 'lucide-react';
import { RegisterModel } from './modals';

interface Props {
  className?: string;
}

export const RegisterModelTrigger: React.FC<Props> = () => {
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <>
      <Button type='button' size='sm' variant='outline' onClick={() => setOpenModal(true)}>
        <Plus className='h-4 w-4 mr-2' />
        Добавить
      </Button>

      <RegisterModel open={openModal} onOpenChange={setOpenModal} />
    </>
  );
};
