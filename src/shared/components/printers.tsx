'use client';
import React, { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui';
import { MoreHorizontal, Plus, PrinterIcon, Search } from 'lucide-react';
import { usePrintersStore } from '../store/printers';
import { CreatePrinter } from '@/shared/components';

interface Props {
  className?: string;
}
export interface Printer {
  id: string;
  name: string; // Например, "HP LaserJet P2055dn"
  compatibleModels: string[]; // Массив названий моделей картриджей
}

export interface CartridgeModel {
  id: string;
  name: string; // Например, "CE505A"
}

export const Printers: React.FC<Props> = () => {
  //const [printers_, setPrinters_] = React.useState<Printer[]>(initialPrinters);

  const { printers, getPrinters } = usePrintersStore();

  React.useEffect(() => {
    getPrinters();
  }, []);

  console.log(printers);

  const [printerSearchTerm, setPrinterSearchTerm] = useState('');

  const filteredPrinters = printers.filter((printer) => {
    const matchesName = printer.name.toLowerCase().includes(printerSearchTerm.toLowerCase());
    const matchesModels = printer.models?.some((model) =>
      model.model.toLowerCase().includes(printerSearchTerm.toLowerCase()),
    );
    return matchesName || matchesModels;
  });
  //******************************* */
  const [showAddPrinterDialog, setShowAddPrinterDialog] = useState(false);

  return (
    <div>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle className='flex items-center gap-2'>
              <PrinterIcon className='h-5 w-5' />
              Принтеры и совместимые картриджи
            </CardTitle>
            <Button onClick={() => setShowAddPrinterDialog(true)}>
              <Plus className='h-4 w-4 mr-2' />
              Добавить принтер
            </Button>
          </div>
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
                  <TableHead className='text-center'>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrinters.map((printer) => (
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <div className='flex items-center justify-center'>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem className='cursor-pointer'>Удалить</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      {/* Диалог добавления принтера */}
      <CreatePrinter open={showAddPrinterDialog} onOpenChange={setShowAddPrinterDialog} />
    </div>
  );
};
