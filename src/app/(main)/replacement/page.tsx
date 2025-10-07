import { CreateDepartament, ReplacementList, Stats } from '@/shared/components';
import React from 'react';

export default function Replace() {
  return (
    <div>
      {/* Статистика */}
      <Stats />

      {/* Список оформленных замен */}
      <ReplacementList />

      {/* Модальное окно создания отдела*/}
      <CreateDepartament />
    </div>
  );
}
