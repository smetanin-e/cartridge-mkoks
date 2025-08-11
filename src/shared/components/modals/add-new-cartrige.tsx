// import React from 'react';
// import {
//   Button,
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/shared/components/ui';
// import { FormInput, FormSelect } from '@/shared/components';
// import { FormProvider, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { FormNewCartrigeType, newKartrigeSchema } from '@/shared/schemas/add-new-kartrige-schema';
// import toast from 'react-hot-toast';

// interface Props {
//   className?: string;
//   openPopup: boolean;
//   closePopup: () => void;
// }

// export const AddNewCartridge: React.FC<Props> = ({ openPopup, closePopup }) => {
//   const form = useForm<FormNewCartrigeType>({
//     resolver: zodResolver(newKartrigeSchema),
//     defaultValues: {
//       number: 'МК',
//       model: '',
//     },
//   });
//   const handleClose = () => {
//     form.reset({
//       number: 'МК',
//       model: '',
//     });
//     closePopup();
//   };

//   const onSubmit = async (data: FormNewCartrigeType) => {
//     console.log(data);
//     toast.success('Картридж добавлен в реестр', {
//       icon: '✅',
//     });
//     closePopup?.();
//   };

//   return (
//     <Dialog open={openPopup} onOpenChange={handleClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Добавление картриджа в реестр</DialogTitle>
//         </DialogHeader>
//         <FormProvider {...form}>
//           <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
//             <div className='flex flex-col gap-3'>
//               <FormInput
//                 name='number'
//                 label='Номер картриджа'
//                 placeholder='Например, МК101'
//                 required
//               />

//               <FormSelect
//                 name='model'
//                 label='Модель'
//                 required
//                 options={[
//                   { value: 'CE505A', label: 'CE505A' },
//                   { value: 'CF426X', label: 'CF426X' },
//                   { value: 'TK-1200', label: 'TK-1200' },
//                 ]}
//               />
//             </div>
//             <DialogFooter>
//               <Button type='button' variant='outline' onClick={handleClose}>
//                 Отмена
//               </Button>
//               <Button type='submit'>Сохранить</Button>
//             </DialogFooter>
//           </form>
//         </FormProvider>
//       </DialogContent>
//     </Dialog>
//   );
// };

import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui';
import { FormInput, FormSelect, FormSelectWithSearch } from '@/shared/components';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormNewCartrigeType, newKartrigeSchema } from '@/shared/schemas/add-new-kartrige-schema';
import toast from 'react-hot-toast';
import { Test } from '../test';

interface Props {
  className?: string;
  //   openPopup: boolean;
  //   closePopup: () => void;
}

export const AddNewCartridge: React.FC<Props> = () => {
  const form = useForm<FormNewCartrigeType>({
    resolver: zodResolver(newKartrigeSchema),
    defaultValues: {
      number: 'МК',
      model: '',
    },
  });

  const onSubmit = async (data: FormNewCartrigeType) => {
    console.log(data);
    toast.success('Картридж добавлен в реестр', {
      icon: '✅',
    });
    form.reset({
      number: 'МК',
      model: '',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Добавление картриджа в реестр</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-3 '>
              <FormInput
                name='number'
                label='Номер картриджа'
                placeholder='Например, МК101'
                required
              />

              {/* <FormSelect
                name='model'
                label='Модель'
                required
                options={[
                  { value: 'CE505A', label: 'CE505A' },
                  { value: 'CF426X', label: 'CF426X' },
                  { value: 'TK-1200', label: 'TK-1200' },
                ]}
              /> */}

              <FormSelectWithSearch
                name='model'
                label='Модель'
                required
                options={[
                  { value: 'CE505A', label: 'CE505A' },
                  { value: 'CF426X', label: 'CF426X' },
                  { value: 'TK-1200', label: 'TK-1200' },
                ]}
              />

              {/* <Controller
                name='framework'
                //control={control}
                render={({ field }) => <Test value={field.value} onChange={field.onChange} />}
              /> */}
            </div>
            <div className='pt-4 flex justify-end gap-8'>
              <Button type='button' variant='outline'>
                Отмена
              </Button>
              <Button type='submit'>Сохранить</Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
