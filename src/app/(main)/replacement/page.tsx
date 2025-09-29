import { CreateDepartament, ReplacementsTable, Stats } from '@/shared/components';
import React from 'react';

export default function Replace() {
  return (
    <div>
      {/* Статистика */}
      <Stats />

      {/* Таблица замен */}
      <ReplacementsTable />

      <CreateDepartament />
    </div>
  );
}
