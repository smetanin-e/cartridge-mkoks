import React from 'react';
import { CustomSelect } from './components/form/custom-select';

interface Props {
  className?: string;
}

export const Test: React.FC<Props> = () => {
  return (
    <div className='mt-12 w-[350px]'>
      <h1>TEST</h1>
      <CustomSelect />
    </div>
  );
};
