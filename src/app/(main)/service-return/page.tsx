import { CompletedBatches, BatchesForReturn, Header } from '@/shared/components/';

export default function ServiceReturn() {
  return (
    <div>
      <Header
        title='Прием из сервиса'
        description='Управление возвратом картриджей из сервисного центра'
      />
      {/* Партии для возврата */}
      <BatchesForReturn />

      {/* Выполненные партии*/}
      <CompletedBatches />
    </div>
  );
}
