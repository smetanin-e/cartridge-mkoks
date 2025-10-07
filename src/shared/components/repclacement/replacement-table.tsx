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
import { DeleteReplace } from './delete-replace';
import { ReplacementsDTO } from '../../services/dto/replacements.dto';
import { CartridgeDTO } from '../../services/dto/cartridge-model.dto.';
interface Props {
  className?: string;
  items: ReplacementsDTO[];
  cartridges: CartridgeDTO[];
}

export const ReplacementTable: React.FC<Props> = ({ items, cartridges }) => {
  //получаем модель картриджа для отображения рядом с номером
  const currentModel = (number: string) => {
    return cartridges.find((cartrige) => cartrige.number === number)?.model?.model;
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Дата</TableHead>
          <TableHead>Подразделение</TableHead>
          <TableHead>Установлен</TableHead>
          <TableHead>Снят</TableHead>
          <TableHead>Ответственный</TableHead>
          <TableHead className='text-center'>Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((rep) => (
          <TableRow key={rep.id} className=''>
            <TableCell>{rep.date}</TableCell>
            <TableCell>{rep.departament.name}</TableCell>
            <TableCell>
              {rep.installedCartridgeNumber ? (
                <Badge variant='outline' className=' text-green-500 text-md'>
                  <p>
                    {rep.installedCartridgeNumber}
                    <span className='text-primary'>
                      {' - '}({currentModel(rep.installedCartridgeNumber)})
                    </span>
                  </p>
                </Badge>
              ) : (
                <Badge variant='outline' className='bg-secondary  text-md'>
                  <span>Отсутствует</span>
                </Badge>
              )}
            </TableCell>
            <TableCell>
              <Badge variant='outline' className=' text-red-500 text-md'>
                {rep.removedCartridgeNumber ? (
                  <p>
                    {rep.removedCartridgeNumber}
                    <span className='text-primary'>
                      {' - '}({currentModel(rep.removedCartridgeNumber)})
                    </span>
                  </p>
                ) : (
                  `Отсутствует`
                )}
              </Badge>
            </TableCell>
            <TableCell>{rep.responsible}</TableCell>
            <TableCell>
              <DeleteReplace id={rep.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
