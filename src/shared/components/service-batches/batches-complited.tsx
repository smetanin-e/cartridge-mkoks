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
interface Props {
  className?: string;
}

export const BatchesComplited: React.FC<Props> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Выполненные партии</CardTitle>
      </CardHeader>
      <CardContent>
        {/* {getCompletedBatches().length === 0 ? ( */}
        <div className='text-center py-8 text-muted-foreground'>Нет выполненных партий</div>
        {/* ) : ( */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Номер партии</TableHead>
              <TableHead>Дата отправки</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Картриджей</TableHead>
              <TableHead>Ответственный</TableHead>
              <TableHead className='text-right'>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {getCompletedBatches().map((batch) => ( */}
            <TableRow>
              <TableCell className='font-medium'>{'batch.batchNumber'}</TableCell>
              <TableCell>{'batch.date'}</TableCell>
              <TableCell>{'getBatchStatusBadge(batch.status)'}</TableCell>
              <TableCell>{'batch.cartridges.length'}</TableCell>
              <TableCell>{'batch.responsible'}</TableCell>
              <TableCell className='text-right'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='outline' size='sm'>
                      <Eye className='h-4 w-4' />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className='max-w-3xl'>
                    <DialogHeader>
                      <DialogTitle>Партия {'batch.batchNumber'} - Выполнено</DialogTitle>
                    </DialogHeader>
                    <div className='space-y-4'>
                      <div className='grid grid-cols-2 gap-4 text-sm bg-green-50 p-4 rounded-lg'>
                        <div>
                          <strong>Дата отправки:</strong> {'batch.date'}
                        </div>
                        <div>
                          <strong>Ответственный за отправку:</strong> {'batch.responsible'}
                        </div>
                        <div>
                          <strong>Статус:</strong> {'getBatchStatusBadge(batch.status)'}
                        </div>
                        <div>
                          <strong>Всего картриджей:</strong> {'batch.cartridges.length'}
                        </div>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Номер</TableHead>
                            <TableHead>Модель</TableHead>
                            <TableHead>Дата возврата</TableHead>
                            <TableHead>Принял</TableHead>
                            <TableHead>Примечания</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {/* {batch.cartridges.map((cartridge) => { */}
                          {/* const returnInfo = getCartridgeReturnInfo(batch, cartridge.id); */}
                          {/* return ( */}
                          <TableRow>
                            <TableCell className='font-medium'>{'cartridge.number'}</TableCell>
                            <TableCell>{'cartridge.model'}</TableCell>
                            <TableCell>
                              {/* {returnInfo ? ( */}
                              <div className='flex items-center gap-1'>
                                <Calendar className='h-3 w-3 text-green-600' />
                                <span className='text-green-700 font-medium'>
                                  {'returnInfo.returnDate'}
                                </span>
                              </div>
                              {/* ) : ( */}
                              <span className='text-muted-foreground'>—</span>
                              {/* )} */}
                            </TableCell>
                            <TableCell>
                              {/* {returnInfo?.responsible ||
                                        cartridge.returnResponsible ||
                                        '—'} */}
                            </TableCell>
                            <TableCell>
                              <span className='text-sm text-muted-foreground'>
                                {/* {returnInfo?.notes || '—'} */}
                              </span>
                            </TableCell>
                          </TableRow>
                          {/* ); */}
                          {/* })} */}
                        </TableBody>
                      </Table>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
        {/* )} */}
      </CardContent>
    </Card>
  );
};
