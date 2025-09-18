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
import { Batch, BatchCartridges } from '@/shared/services/dto/service-batch.dto';
interface Props {
  className?: string;
  date: string;
  responsible: string;
  status: React.ReactNode;
  cartridges: BatchCartridges[];
  batch: Batch;
}

export const ShowBatchComplited: React.FC<Props> = ({ date, responsible, status, cartridges }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm'>
          <Eye className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-4xl sm:max-w-auto'>
        <DialogHeader>
          <DialogTitle>Партия от {date} - Выполнено</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4 text-sm bg-green-50 p-4 rounded-lg'>
            <div>
              <strong>Дата отправки:</strong> {date}
            </div>
            <div>
              <strong>Ответственный за отправку:</strong> {responsible}
            </div>
            <div className='flex gap-3'>
              <strong>Статус:</strong> <p>{status}</p>
            </div>
            <div>
              <strong>Всего картриджей:</strong> {cartridges.length}
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Номер</TableHead>
                <TableHead>Модель</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата возврата</TableHead>
                <TableHead>Принял</TableHead>
                <TableHead>Комментарий</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartridges.map((cartridge) => {
                return (
                  <TableRow key={cartridge.number}>
                    <TableCell>{cartridge.number}</TableCell>
                    <TableCell>{cartridge.model.model}</TableCell>

                    <TableCell>
                      <Badge variant={'success'}>Возвращен</Badge>
                    </TableCell>
                    <TableCell>
                      <div className='flex items-center gap-1 text-sm'>
                        <Calendar className='h-3 w-3' />
                        {cartridge.returnDate}
                      </div>
                    </TableCell>
                    <TableCell>{cartridge.returnResponsible}</TableCell>
                    <TableCell className='max-w-[200px] truncate whitespace-normal break-words'>
                      {cartridge.returnNotes ? (
                        <div className='text-xs max-w-[250px]'>{cartridge.returnNotes}</div>
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
