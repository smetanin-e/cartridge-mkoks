import React from 'react';
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { PrinterDTO } from '../../services/dto/printer.dto';
import { DeletePrinter } from './delete-printer';

interface Props {
  className?: string;
  printers: PrinterDTO[];
}

export const PrinterList: React.FC<Props> = ({ printers }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Название принтера</TableHead>
          <TableHead>Совместимые модели</TableHead>
          <TableHead className='text-center'>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {printers.map((printer) => (
          <TableRow key={printer.id}>
            <TableCell className='font-medium'>{printer.name}</TableCell>
            <TableCell>
              <div className='flex flex-wrap gap-1'>
                {printer.models?.length === 0 ? (
                  <Badge variant='outline' className='text-muted-foreground'>
                    Нет данных
                  </Badge>
                ) : (
                  printer.models?.map((modelName) => (
                    <Badge key={modelName.id} variant='secondary'>
                      {modelName.model}
                    </Badge>
                  ))
                )}
              </div>
            </TableCell>
            <TableCell>
              <DeletePrinter id={printer.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
