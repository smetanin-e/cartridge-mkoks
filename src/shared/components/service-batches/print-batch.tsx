import React, { forwardRef } from 'react';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { BatchCartridges } from '../../services/dto/service-batch.dto';

interface Props {
  responsible: string;
  date: string;
  cartridges: BatchCartridges[];
}

export const PrintBatch = forwardRef<HTMLDivElement, Props>(
  ({ responsible, date, cartridges }, ref) => {
    return (
      <div ref={ref} className='py-12 px-16 text-[14px]' style={{ fontFamily: 'Arial' }}>
        <div className='flex gap-10 justify-between mb-10'>
          <div className='shrink-0'>
            <Image src='/ygmk.jpg' alt='logo' width={158} height={81} />
          </div>

          <div className='flex flex-col gap-1'>
            <p>
              ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «ЮЖНЫЙ ГОРНО-МЕТАЛЛУРГИЧЕСКИЙ КОМПЛЕКС
              ДОНЕЦК»
            </p>
            <p>ФИЛИАЛ №4 «МАКЕЕВКОКС»</p>
          </div>
        </div>

        <h1 className='font-bold text-lg mt-30'>Ведомость передачи картриджей на заправку</h1>

        <div className='text-md'>
          <strong>Дата отправки:{` `} </strong>
          {date}
        </div>

        <div className='mt-3'>
          <Table className='border border-black mb-4'>
            <TableHeader className='bg-gray-100 '>
              <TableRow>
                <TableHead className=' py-1.5 px-1 h-4 min-h-0 text-xs'>№ п/п</TableHead>
                <TableHead className='border border-black py-1.5 px-1 h-4 min-h-0 text-xs'>
                  Модель картриджа
                </TableHead>
                <TableHead className='py-1.5 px-1 h-4 min-h-0 text-xs'>№ картриджа</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartridges.map((c, index) => (
                <TableRow key={c.number}>
                  <TableCell className='border border-black px-1 py-0.5 text-xs'>
                    {index + 1}
                  </TableCell>
                  <TableCell className='border border-black px-1 py-0.5 text-xs'>
                    {c.model.model}
                  </TableCell>
                  <TableCell className='border border-black px-1 py-0.5 text-xs'>
                    {c.number}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='flex flex-col gap-4'>
          <div>
            <strong>Количество картриджей:</strong> {cartridges.length} шт.
          </div>
          <p>Ответственный за отправку: _________________ {responsible}</p>
          <p>Принял: __________________________________ </p>
        </div>
      </div>
    );
  },
);

PrintBatch.displayName = 'PrintBatch';
