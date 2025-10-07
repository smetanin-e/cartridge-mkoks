'use client';
import React from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { Printer } from 'lucide-react';
import { ShowBatch, PrintBatch, LoadingBounce, DeleteBatch, ShowMore } from '@/shared/components';

import { useBatchList } from '@/shared/hooks';
import { BatchStatus } from '@prisma/client';

interface Props {
  className?: string;
}

export const Batches: React.FC<Props> = () => {
  const { batches, loadBatches, showMore, loading, loadingInitial } = useBatchList(
    [BatchStatus.IN_PROGRESS],
    3,
  );

  const contentRef = React.useRef<HTMLDivElement>(null);
  //Сохраняем индекс партии на которую нажали, чтобы передать этот элемент в печать
  //* *Делаем так, потому что 'react-to-print' работает через Ref, а он в map не работает*
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const print = (index: number) => {
    setSelectedIndex(index);
    setTimeout(() => {
      printBatch();
    }, 0);
  };

  const printBatch = useReactToPrint({
    contentRef,
  });

  return (
    <Card className='mt-6 min-h-[210px] relative pb-12'>
      {loadingInitial ? (
        <div className='h-[100px]'>
          <LoadingBounce />
        </div>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Партии отправок в сервис</CardTitle>
          </CardHeader>
          <CardContent>
            {batches.length === 0 ? (
              <div className='text-center py-8 text-muted-foreground'>
                Партии для отправки отсутствуют
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата отправки</TableHead>
                      <TableHead>Количество</TableHead>
                      <TableHead>Ответственный</TableHead>
                      <TableHead className='text-right'>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {batches &&
                      batches.map((batch, index) => {
                        return (
                          <TableRow key={batch.id}>
                            <TableCell>{batch.date}</TableCell>
                            <TableCell>
                              <Badge variant='outline'>{batch.cartridges.length} шт.</Badge>
                            </TableCell>
                            <TableCell>{batch.responsible}</TableCell>
                            <TableCell className='text-right'>
                              <div className='flex gap-2 justify-end'>
                                <ShowBatch
                                  cartridges={batch.cartridges}
                                  date={batch.date}
                                  responsible={batch.responsible}
                                />

                                <Button
                                  variant='outline'
                                  size='sm'
                                  onClick={() => {
                                    print(index);
                                  }}
                                >
                                  <Printer className='h-4 w-4' />
                                </Button>
                                {batch.status === BatchStatus.IN_PROGRESS && (
                                  <DeleteBatch cartridges={batch.cartridges} id={batch.id} />
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
                <ShowMore showMore={showMore} loading={loading} loadItems={loadBatches} />
              </>
            )}
          </CardContent>
        </>
      )}

      {/* Печатная форма ведомости */}
      <div className='hidden '>
        {batches[selectedIndex] && (
          <PrintBatch
            ref={contentRef}
            cartridges={batches[selectedIndex].cartridges}
            date={batches[selectedIndex].date}
            responsible={batches[selectedIndex].responsible}
          />
        )}
      </div>
    </Card>
  );
};
