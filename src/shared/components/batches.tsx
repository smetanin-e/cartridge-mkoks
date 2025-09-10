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
import { Eye, Printer } from 'lucide-react';
import { useServiceBatchStore } from '../store/service-batch';

interface Props {
  className?: string;
}

export const Batches: React.FC<Props> = () => {
  const { batches, getBatchesFromDB } = useServiceBatchStore();
  React.useEffect(() => {
    getBatchesFromDB();
  }, []);
  console.log(batches);
  return (
    <Card className='mt-6'>
      <CardHeader>
        <CardTitle>История отправок в сервис</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Номер партии</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Количество</TableHead>
              <TableHead>Ответственный</TableHead>
              <TableHead className='text-right'>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches &&
              batches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className='font-medium'>{batch.id}</TableCell>
                  <TableCell>{batch.date}</TableCell>
                  <TableCell>
                    <Badge variant='outline'>{batch.cartridges.length} шт.</Badge>
                  </TableCell>
                  <TableCell>{batch.responsible}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex gap-2 justify-end'>
                      {/* <Dialog>
                          <DialogTrigger asChild>
                            <Button variant='outline' size='sm'>
                              <Eye className='h-4 w-4' />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className='max-w-2xl'>
                            <DialogHeader>
                              <DialogTitle>Партия {'batch.batchNumber'}</DialogTitle>
                            </DialogHeader>
                            <div className='space-y-4'>
                              <div className='grid grid-cols-2 gap-4 text-sm'>
                                <div>
                                  <strong>Дата:</strong> {batch.date}
                                </div>
                                <div>
                                  <strong>Ответственный:</strong> {batch.responsible}
                                </div>
                                <div>
                                  <strong>Количество:</strong> {batch.cartridges.length} шт.
                                </div>

                               
                              </div>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Номер</TableHead>
                                    <TableHead>Модель</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  <TableRow>
                                    <TableCell>{'cartridge.number'}</TableCell>
                                    <TableCell>{'cartridge.model'}</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </DialogContent>
                        </Dialog> */}
                      {/* onClick={() => printBatch(batch)} */}
                      <Button variant='outline' size='sm'>
                        <Printer className='h-4 w-4' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
