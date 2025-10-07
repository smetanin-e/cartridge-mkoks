import React from 'react';
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';
import { Filter, Search } from 'lucide-react';
import { ClearButton } from '@/shared/components';
import { CartridgeStatus } from '@prisma/client';
import { CARTRIDGE_STATUS_CONFIG } from '@/shared/constants';
interface Props {
  className?: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  statusFilter: CartridgeStatus | 'all';
  setStatusFilter: (value: CartridgeStatus | 'all') => void;
}

export const CartridgesFilter: React.FC<Props> = ({
  searchValue,
  setSearchValue,
  statusFilter,
  setStatusFilter,
}) => {
  const onClickClear = () => {
    setSearchValue('');
  };

  return (
    <div className='flex flex-col  md:flex-row gap-4 mt-2'>
      <div className='relative '>
        <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Поиск...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className='pl-10 bg-white '
        />
        {searchValue && <ClearButton onClick={onClickClear} />}
      </div>

      <div className='w-full md:w-4 '>
        <Select
          value={statusFilter}
          onValueChange={(value) => setStatusFilter(value as CartridgeStatus | 'all')}
        >
          <SelectTrigger className='bg-white'>
            <Filter className='h-4 w-4 mr-2' />
            <SelectValue placeholder='Статус' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Все статусы</SelectItem>
            {Object.entries(CARTRIDGE_STATUS_CONFIG).map(([status, config]) => (
              <SelectItem key={status} value={status}>
                {config.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
