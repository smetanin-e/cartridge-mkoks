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
import { ChevronsDown, Printer } from 'lucide-react';
import { ShowBatch, PrintBatch, LoadingBounce } from '@/shared/components';

import { useBatchList } from '@/shared/hooks';
import { BatchStatus } from '@prisma/client';

interface Props {
  className?: string;
}

export const Batches: React.FC<Props> = () => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  // какой batch печатаем
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const printBatch = useReactToPrint({
    contentRef,
  });

  const { batches, loadBatches, hasMore, loading, loadingInitial } = useBatchList(
    [BatchStatus.IN_PROGRESS, BatchStatus.PARTIAL_RETURN],
    3,
  );

  return (
    <Card className='mt-6 max-h-[500px] min-h-[235px] relative pb-12'>
      {loadingInitial ? (
        <div className='h-[100px]'>
          <LoadingBounce />
        </div>
      ) : (
        <>
          <CardHeader>
            <CardTitle>Партии отправок в сервис</CardTitle>
          </CardHeader>
          <CardContent className='overflow-y-scroll h-[100%]'>
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
                                setSelectedIndex(index);
                                setTimeout(() => {
                                  printBatch();
                                }, 0);
                              }}
                            >
                              <Printer className='h-4 w-4' />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <div className='pt-4 text-center absolute bottom-[8px] left-[50%]'>
              {hasMore && (
                <>
                  {loading ? (
                    <div className='relative pb-8'>
                      <LoadingBounce />
                    </div>
                  ) : (
                    <Button
                      className='translate-x-[-50%]'
                      size='sm'
                      disabled={loading}
                      variant='ghost'
                      onClick={() => loadBatches()}
                    >
                      <ChevronsDown />
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </>
      )}

      {/* Компонент, который печатается */}
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
