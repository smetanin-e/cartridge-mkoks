'use client';
import React from 'react';
import {
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
import { BatchStatus } from '@prisma/client';
import { getBatchStatusBadge } from '../utils';
import { Batch } from '@/shared/services/dto/service-batch.dto';
import { CartridgesReturn, ShowBatchForReturn } from '../modals';
import { useBatchList } from '@/shared/hooks';
import { LoadingBounce } from '../loading-bounce';
interface Props {
  className?: string;
}

export const BatchesForReturn: React.FC<Props> = () => {
  const { batches, loading, loadingInitial, refetch } = useBatchList([
    BatchStatus.IN_PROGRESS,
    BatchStatus.PARTIAL_RETURN,
  ]);

  const getAvailableCartridges = (batch: Batch) => {
    return batch.cartridges.filter((c) => !c.returned);
  };

  const getReturnedCartridges = (batch: Batch) => {
    return batch.cartridges.filter((c) => c.returned);
  };

  return (
    <Card className='mb-6 min-h-[184px] relative'>
      {loadingInitial || loading ? (
        <LoadingBounce />
      ) : (
        <>
          <CardHeader>
            <CardTitle>Партии в работе ({batches.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {batches.length === 0 ? (
              <div className='text-center py-8 text-muted-foreground'>Нет партий в работе</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата отправки партии</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Картриджей</TableHead>
                    <TableHead>Ответственный</TableHead>
                    <TableHead className='text-right'>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batches.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell>{batch.date}</TableCell>
                      <TableCell>{getBatchStatusBadge(batch.status)}</TableCell>
                      <TableCell>
                        <div className='flex flex-col text-sm'>
                          <span>Всего: {batch.cartridges.length}</span>
                          {batch.status === BatchStatus.PARTIAL_RETURN && (
                            <>
                              <span className='text-green-600'>
                                Вернулось: {getReturnedCartridges(batch).length}
                              </span>
                              <span className='text-orange-600'>
                                Осталось: {getAvailableCartridges(batch).length}
                              </span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{batch.responsible}</TableCell>
                      <TableCell className='text-right'>
                        <div className='flex gap-2 justify-end'>
                          <ShowBatchForReturn
                            date={batch.date}
                            responsible={batch.responsible}
                            status={getBatchStatusBadge(batch.status)}
                            cartridges={batch.cartridges}
                            batch={batch}
                          />
                          <CartridgesReturn
                            batchId={batch.id}
                            date={batch.date}
                            responsible={batch.responsible}
                            status={getBatchStatusBadge(batch.status)}
                            cartridges={batch.cartridges}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
};
