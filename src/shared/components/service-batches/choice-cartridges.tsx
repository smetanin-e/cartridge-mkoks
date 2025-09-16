import React from 'react';
import {
  Badge,
  Checkbox,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { CartridgeStatus } from '@prisma/client';
import { Calendar, CheckCircle } from 'lucide-react';
import { BatchCartridges } from '@/shared/services/dto/service-batch.dto';
interface Props {
  className?: string;
  selectedCartridges: number[];
  setSelectedCartridges: React.Dispatch<React.SetStateAction<number[]>>;
  cartridges: BatchCartridges[];
}

export const ChoiceCartridges: React.FC<Props> = ({
  selectedCartridges,
  setSelectedCartridges,
  cartridges,
}) => {
  const avaibleCartridges = cartridges.filter((c) => !c.returned);
  const isAllSelected =
    cartridges.length > 0 && selectedCartridges.length === avaibleCartridges.length;
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const avaibleIds = avaibleCartridges.map((c) => c.id);
      setSelectedCartridges(avaibleIds);
    } else {
      setSelectedCartridges([]);
    }
  };

  const handleCartridgeSelect = (cartridgeId: number, checked: boolean) => {
    if (checked) {
      setSelectedCartridges((prev) => [...prev, cartridgeId]);
    } else {
      setSelectedCartridges((prev) => prev.filter((id) => id !== cartridgeId));
    }
  };
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold'>
          Выберите картриджи для приема (доступно: {avaibleCartridges.length})
        </h3>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='select-all-return'
            checked={isAllSelected}
            onCheckedChange={(checked) => handleSelectAll(checked === true)}
          />
          <Label htmlFor='select-all-return' className='text-sm'>
            Выбрать все
          </Label>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-12'></TableHead>
            <TableHead>Номер</TableHead>
            <TableHead>Модель</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Дата возврата</TableHead>
            <TableHead>Ответственный</TableHead>
            <TableHead>Комментарий</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartridges.map((c) => (
            <TableRow key={c.id}>
              <TableCell>
                {c.status === CartridgeStatus.SERVICE ? (
                  <Checkbox
                    checked={selectedCartridges.includes(c.id)}
                    onCheckedChange={(checked) => handleCartridgeSelect(c.id, checked as boolean)}
                  />
                ) : (
                  <CheckCircle className='h-4 w-4 text-success' />
                )}
              </TableCell>
              <TableCell className='font-medium'>{c.number}</TableCell>
              <TableCell>{c.model.model}</TableCell>
              <TableCell>
                <Badge variant={c.returned ? 'success' : 'secondary'}>
                  {c.returned ? 'Возвращен' : 'В сервисе'}
                </Badge>
              </TableCell>
              <TableCell>
                {c.returned ? (
                  <div className='flex items-center gap-1 text-sm'>
                    <Calendar className='h-3 w-3' />
                    <span>{c.returnDate}</span>
                  </div>
                ) : (
                  <span className='text-muted-foreground text-sm'>—</span>
                )}
              </TableCell>
              <TableCell>
                {c.returned ? (
                  <div>{c.returnResponsible}</div>
                ) : (
                  <span className='text-muted-foreground text-sm'>—</span>
                )}
              </TableCell>
              <TableCell className='max-w-[150px] truncate whitespace-normal break-words'>
                {c.returnNotes ? (
                  <div className='text-xs max-w-[250px]'>{c.returnNotes}</div>
                ) : (
                  <span className='text-muted-foreground text-sm'>—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
