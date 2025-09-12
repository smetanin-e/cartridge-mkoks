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
import { Calendar, Eye } from 'lucide-react';
import { useServiceBatchStore } from '@/shared/store/service-batch';
import { BatchStatus } from '@prisma/client';
interface Props {
  className?: string;
}

export const BatchesForReturn: React.FC<Props> = () => {
  const { batches, getBatchesFromDB } = useServiceBatchStore();
  React.useEffect(() => {
    getBatchesFromDB();
  }, []);

  const batchesInService = batches.filter((batch) => batch.status === BatchStatus.IN_PROGRESS);

  return (
    <Card className='mb-6'>
      <CardHeader>
        <CardTitle>Партии в работе (5)</CardTitle>
      </CardHeader>
      <CardContent>
        {batchesInService.length === 0 ? (
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
              {/* {getInProgressBatches().map((batch) => {
                  const availableCount = getAvailableCartridges(batch).length;
                  const returnedCount = getReturnedCartridges(batch).length;
                  const totalCount = batch.cartridges.length;
                  
                  return ( */}
              <TableRow>
                <TableCell>{'batch.date'}</TableCell>
                <TableCell>{'getBatchStatusBadge(batch.status)'}</TableCell>
                <TableCell>
                  <div className='flex flex-col text-sm'>
                    <span>Всего: {'totalCount'}</span>
                    {/* {batch.status === 'partial_return' && ( */}
                    <>
                      <span className='text-green-600'>Вернулось: {'returnedCount'}</span>
                      <span className='text-orange-600'>Осталось: {'availableCount'}</span>
                    </>
                    {/* )} */}
                  </div>
                </TableCell>
                <TableCell>{'batch.responsible'}</TableCell>
                <TableCell className='text-right'>
                  <div className='flex gap-2 justify-end'>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant='outline' size='sm'>
                          <Eye className='h-4 w-4' />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='max-w-2xl'>
                        <DialogHeader>
                          <DialogTitle>Партия {5}</DialogTitle>
                        </DialogHeader>
                        <div className='space-y-4'>
                          <div className='grid grid-cols-2 gap-4 text-sm'>
                            <div>
                              <strong>Дата отправки:</strong> {'batch.date'}
                            </div>
                            <div>
                              <strong>Ответственный:</strong> {'batch.responsible'}
                            </div>
                            <div>
                              <strong>Статус:</strong> {'getBatchStatusBadge(batch.status)'}
                            </div>
                            {/* {batch.partialReturnDate && ( */}
                            <div>
                              <strong>Дата частичного возврата:</strong> {'batch.partialReturnDate'}
                            </div>
                            {/* )} */}
                          </div>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Номер</TableHead>
                                <TableHead>Модель</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead>Дата возврата</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {/* {batch.cartridges.map((cartridge) => {
                                      const returnInfo = getCartridgeReturnInfo(batch, cartridge.id); */}
                              {/* return ( */}
                              <TableRow>
                                <TableCell>{'cartridge.number'}</TableCell>
                                <TableCell>{'cartridge.model'}</TableCell>
                                <TableCell>
                                  {/* <Badge variant={cartridge.status === 'available' ? 'default' : 'secondary'}>
                                              {cartridge.status === 'available' ? 'Возвращен' : 'В сервисе'}
                                            </Badge> */}
                                </TableCell>
                                <TableCell>
                                  {/* {returnInfo ? ( */}
                                  <div className='flex items-center gap-1 text-sm'>
                                    <Calendar className='h-3 w-3' />
                                    {'returnInfo.returnDate'}
                                  </div>
                                  {/* ) : ( */}
                                  <span className='text-muted-foreground text-sm'>—</span>
                                  {/* )} */}
                                </TableCell>
                              </TableRow>
                              {/* );
                                    })} */}
                            </TableBody>
                          </Table>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      size='sm'
                      // onClick={() => openReturnDialog(batch)}
                      // disabled={getAvailableCartridges(batch).length === 0}
                    >
                      Принять
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              {/* );
                })} */}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
