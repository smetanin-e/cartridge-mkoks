import { CompletedBatches, BatchesForReturn } from '@/shared/components/';

export default function ServiceReturn() {
  return (
    <div>
      {/* Партии для возврата */}
      <BatchesForReturn />

      {/* Выполненные партии*/}
      <CompletedBatches />
    </div>
  );
}
