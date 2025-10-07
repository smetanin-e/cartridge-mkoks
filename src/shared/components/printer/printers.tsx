'use client';

import { Card, CardContent, CardHeader, CardTitle, Input } from '@/shared/components/ui';
import { PrinterIcon, Search } from 'lucide-react';
import { usePrintersStore } from '../../store/printers';
import { ClearButton, CreatePrinter, LoadingBounce, PrinterList } from '@/shared/components';
import React from 'react';
import { searchPrinterFilter } from '@/shared/lib';

interface Props {
  className?: string;
}
export const Printers: React.FC<Props> = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const { loading, printers, getPrinters } = usePrintersStore();

  const filteredPrinters = searchPrinterFilter(printers, searchValue);

  const onClickClear = () => {
    setSearchValue('');
  };

  React.useEffect(() => {
    getPrinters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Card className='gap-1 p-0 overflow-hidden'>
        <CardHeader className='pb-5 pt-4 relative shadow-sm bg-card-header'>
          <div className='flex items-center justify-between'>
            <CardTitle className='flex items-center gap-2'>
              <PrinterIcon className='h-5 w-5' />
              Принтеры и совместимые картриджи
            </CardTitle>
            <CreatePrinter />
          </div>
          <div className='relative mt-2'>
            <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Поиск принтера по названию или модели картриджа...'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className='pl-10 bg-white'
            />
            {searchValue && <ClearButton onClick={onClickClear} />}
          </div>
        </CardHeader>
        <CardContent className='relative h-[625px]'>
          {loading ? (
            <LoadingBounce />
          ) : (
            <>
              {filteredPrinters.length === 0 ? (
                <div className='h-[625px] text-center py-8 text-muted-foreground'>
                  Нет данных о принтерах
                </div>
              ) : (
                <div className='h-[625px] overflow-auto overflow-y-scroll'>
                  <PrinterList printers={filteredPrinters} />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
