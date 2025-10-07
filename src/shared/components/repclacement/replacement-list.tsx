'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Input } from '@/shared/components/ui';
import {
  ClearButton,
  LoadingBounce,
  Replacement,
  ReplacementTable,
  ShowMore,
} from '@/shared/components';
import { Search } from 'lucide-react';
import { CartridgeStatus } from '@prisma/client';
import { useCartridgeList, useReplacementList } from '../../hooks';

interface Props {
  className?: string;
}

export const ReplacementList: React.FC<Props> = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const { cartridges } = useCartridgeList();
  const { loading, loadReplacemens, loadingInitial, replacements, showMore } = useReplacementList(
    searchValue,
    9,
  );

  const onClickClear = () => {
    setSearchValue('');
  };

  const avaibleCartridges = cartridges.filter(
    (cartridge) => cartridge.status === CartridgeStatus.AVAILABLE,
  );
  const workingCartridges = cartridges.filter(
    (cartridge) => cartridge.status === CartridgeStatus.WORKING,
  );

  return (
    <>
      <Card className='mt-6 p-0 overflow-hidden pb-12 relative'>
        <CardHeader className='pb-5 pt-4 bg-card-header shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-10'>
              {' '}
              <CardTitle>История замен</CardTitle>
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
            </div>

            {/* Попап замены картриджа */}
            <Replacement
              avaibleCartridges={avaibleCartridges}
              workingCartridges={workingCartridges}
            />
          </div>
        </CardHeader>
        <div className='min-h-[50px] relative'>
          {loadingInitial ? (
            <LoadingBounce />
          ) : (
            <CardContent>
              {replacements.length === 0 ? (
                <div className='text-center py-8 text-muted-foreground'>Ничего не найдено</div>
              ) : (
                <div>
                  <ReplacementTable items={replacements} cartridges={cartridges} />
                </div>
              )}
            </CardContent>
          )}
        </div>
        <ShowMore showMore={showMore} loading={loading} loadItems={loadReplacemens} />
      </Card>
    </>
  );
};
