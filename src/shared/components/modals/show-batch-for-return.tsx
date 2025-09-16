import React from 'react';

import {
  Badge,
  Button,
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
import { CartridgeStatus } from '@prisma/client';

import { Batch, BatchCartridges } from '@/shared/services/dto/service-batch.dto';
import { cn, getCartridgeReturnInfo } from '@/shared/lib';

interface Props {
  className?: string;
  date: string;
  responsible: string;
  status: React.ReactNode;
  cartridges: BatchCartridges[];
  batch: Batch;
}

export const ShowBatchForReturn: React.FC<Props> = ({
  date,
  responsible,
  status,
  cartridges,
  batch,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Eye className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl sm:max-w-auto'>
        <DialogHeader>
          <DialogTitle>Партия от {date}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid grid-cols-1 gap-1 text-sm'>
            <div>
              <strong>Партию отправлял:</strong> {responsible}
            </div>
            <div className='flex gap-3'>
              <strong>Статус:</strong> <p>{status}</p>
            </div>

            {batch.partialReturnDate && (
              <div>
                <strong>Дата частичного возврата:</strong> {batch.partialReturnDate}
              </div>
            )}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Номер</TableHead>
                <TableHead>Модель</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата возврата</TableHead>
                <TableHead>Принял</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartridges.map((cartridge) => {
                const returnInfo = getCartridgeReturnInfo(batch, cartridge.number);
                const isStatusAvaible = cartridge.status === CartridgeStatus.AVAILABLE;
                return (
                  <TableRow key={cartridge.number}>
                    <TableCell>{cartridge.number}</TableCell>
                    <TableCell>{cartridge.model.model}</TableCell>

                    <TableCell>
                      <Badge variant={isStatusAvaible ? 'success' : 'outline'}>
                        {isStatusAvaible ? 'Возвращен' : 'В сервисе'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {returnInfo?.returnDate ? (
                        <div className='flex items-center gap-1 text-sm'>
                          <Calendar className='h-3 w-3' />
                          {returnInfo.returnDate}
                        </div>
                      ) : (
                        <span className='text-muted-foreground text-sm'>—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {cartridge.returnResponsible ? (
                        cartridge.returnResponsible
                      ) : (
                        <span className='text-muted-foreground text-sm'>—</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
