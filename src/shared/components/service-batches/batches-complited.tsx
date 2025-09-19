'use client';
import React from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';

import { useBatchList } from '@/shared/hooks';
import { BatchStatus } from '@prisma/client';
import { LoadingBounce } from '../loading-bounce';
import { getBatchStatusBadge } from '../utils';
import { ShowBatchComplited } from '../modals';
interface Props {
  className?: string;
}

export const BatchesComplited: React.FC<Props> = () => {
  const { batches, loading, loadingInitial, refetch } = useBatchList([BatchStatus.COMPLITED]);
  return (
    <Card className='min-h-[184px] relative'>
      {loadingInitial || loading ? (
        <LoadingBounce />
      ) : (
        <>
          <CardHeader>
            <CardTitle>Выполненные партии</CardTitle>
          </CardHeader>
          <CardContent>
            {batches.length === 0 ? (
              <div className='text-center py-8 text-muted-foreground'>Нет выполненных партий</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата отправки</TableHead>
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
                      <TableCell>{batch.cartridges.length}</TableCell>
                      <TableCell>{batch.responsible}</TableCell>
                      <TableCell className='text-right'>
                        <ShowBatchComplited
                          date={batch.date}
                          responsible={batch.responsible}
                          status={getBatchStatusBadge(batch.status)}
                          cartridges={batch.cartridges}
                          batch={batch}
                        />
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
