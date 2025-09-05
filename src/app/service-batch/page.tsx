import { CartridgesForRefile } from '@/shared/components';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from '@/shared/components/ui';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

export default function ServiceBatch() {
  return (
    <div className='container mx-auto p-6'>
      <div className='flex items-center gap-4 mb-6'>
        <Link href='/'>
          <Button variant='outline' size='sm'>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Назад
          </Button>
        </Link>
        <div>
          <h1 className='text-3xl font-bold'>Отправка в сервис</h1>
          <p className='text-muted-foreground'>
            Формирование партий картриджей для отправки в сервисный центр
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Список доступных картриджей */}
        <CartridgesForRefile />

        {/* Форма создания партии */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Данные партии</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='batchNumber'>Номер партии</Label>
                  <Input
                    id='batchNumber'
                    // {...register("batchNumber", { required: "Номер партии обязателен" })}
                  />
                  {/* {errors.batchNumber && (
                    <p className="text-sm text-red-500 mt-1">{errors.batchNumber.message}</p>
                  )} */}
                </div>

                <div>
                  <Label htmlFor='date'>Дата отправки</Label>
                  <Input
                    id='date'
                    type='date'
                    //{...register("date", { required: "Дата обязательна" })}
                  />
                  {/* {errors.date && (
                    <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>
                  )} */}
                </div>

                <div>
                  <Label htmlFor='responsible'>Ответственный</Label>
                  <Input
                    id='responsible'
                    placeholder='ФИО ответственного'
                    //  {...register("responsible", { required: "Ответственный обязателен" })}
                  />
                  {/* {errors.responsible && (
                    <p className="text-sm text-red-500 mt-1">{errors.responsible.message}</p>
                  )} */}
                </div>

                <div>
                  <Label htmlFor='notes'>Примечания</Label>
                  <Textarea
                    id='notes'
                    placeholder='Дополнительная информация...'
                    // {...register("notes")}
                  />
                </div>

                <div className='pt-4 border-t'>
                  <div className='text-sm text-muted-foreground mb-4'>
                    Выбрано картриджей: <strong>{'selectedCartridges.length'}</strong>
                  </div>
                  <Button
                    type='submit'
                    className='w-full'
                    //disabled={selectedCartridges.length === 0}
                  >
                    <Send className='h-4 w-4 mr-2' />
                    Отправить в сервис
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
