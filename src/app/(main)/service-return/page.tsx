import { BatchesComplited, BatchesForReturn } from '@/shared/components/';

export default function ServiceReturn() {
  return (
    <div>
      {/* <div className='text-center mb-6'>
        <h1 className='text-3xl font-bold'>Прием из сервиса</h1>
        <p className='text-muted-foreground'>
          Управление возвратом картриджей из сервисного центра
        </p>
      </div> */}

      {/* Партии для возврата */}
      <BatchesForReturn />

      {/* Выполненные партии*/}
      <BatchesComplited />
    </div>
  );
}
