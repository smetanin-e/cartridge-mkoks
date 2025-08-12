'use client';

import { RegisterCartridge, RegisterModel } from '@/shared/components';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { ArrowLeft, Package, Plus, PrinterIcon, Search } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export interface Printer {
  id: string;
  name: string; // Например, "HP LaserJet P2055dn"
  compatibleModels: string[]; // Массив названий моделей картриджей
}

export interface CartridgeModel {
  id: string;
  name: string; // Например, "CE505A"
}

const initialCartridgeModels: CartridgeModel[] = [
  { id: 'm1', name: 'CE505A' },
  { id: 'm2', name: 'CF280A' },
  { id: 'm3', name: 'CB435A' },
  { id: 'm4', name: 'HP 12A' },
];

const initialPrinters: Printer[] = [
  { id: 'p1', name: 'HP LaserJet P2055dn', compatibleModels: ['CE505A', 'CF280A'] },
  { id: 'p2', name: 'Canon i-SENSYS MF4410', compatibleModels: ['Canon 728'] },
  { id: 'p3', name: 'HP LaserJet 1018', compatibleModels: ['HP 12A'] },
  { id: 'p4', name: 'HP LaserJet Pro M402dn', compatibleModels: ['CF280A'] },
];

export default function CartridgesPage() {
  //=============================================

  const [printers, setPrinters] = React.useState<Printer[]>(initialPrinters);
  const [printerSearchTerm, setPrinterSearchTerm] = useState('');

  const [cartridgeModels, setCartridgeModels] = useState<CartridgeModel[]>(initialCartridgeModels);
  const [newModelName, setNewModelName] = useState('');

  const filteredPrinters = printers.filter((printer) => {
    const matchesName = printer.name.toLowerCase().includes(printerSearchTerm.toLowerCase());
    const matchesModels = printer.compatibleModels.some((model) =>
      model.toLowerCase().includes(printerSearchTerm.toLowerCase()),
    );
    return matchesName || matchesModels;
  });

  return (
    <div className='container mx-auto p-6'>
      {/* HEADER */}
      <div className='flex items-center gap-4 mb-6'>
        <Link href='/'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Назад
          </Button>
        </Link>
        <div>
          <h1 className='text-3xl font-bold'>Реестр картриджей</h1>
          <p className='text-muted-foreground'>
            Управление моделями картриджей и совместимостью принтеров
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='space-y-6'>
          {/* Регистрация картриджа */}
          <RegisterCartridge />

          {/* Добавление новой модели картриджа */}
          <RegisterModel />
        </div>

        {/* Таблица принтеров */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <PrinterIcon className='h-5 w-5' />
                Принтеры и совместимые картриджи
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='relative mb-4'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' />
                <Input
                  placeholder='Поиск принтера по названию или модели картриджа...'
                  value={printerSearchTerm}
                  onChange={(e) => setPrinterSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
              {filteredPrinters.length === 0 ? (
                <div className='text-center py-8 text-muted-foreground'>Нет данных о принтерах</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название принтера</TableHead>
                      <TableHead>Совместимые модели</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPrinters.map((printer) => (
                      <TableRow key={printer.id}>
                        <TableCell className='font-medium'>{printer.name}</TableCell>
                        <TableCell>
                          <div className='flex flex-wrap gap-1'>
                            {printer.compatibleModels.length === 0 ? (
                              <Badge variant='outline' className='text-muted-foreground'>
                                Нет данных
                              </Badge>
                            ) : (
                              printer.compatibleModels.map((modelName) => (
                                <Badge key={modelName} variant='secondary'>
                                  {modelName}
                                </Badge>
                              ))
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
