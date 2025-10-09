import { CreateDepartament, Header, ReplacementList, Stats } from '@/shared/components';
import React from 'react';

export default function Replace() {
  return (
    <div>
      <Header title='Замена картриджа' description='Оформление замены картриджа, статистика' />
      {/* Статистика */}
      <Stats />

      {/* Список оформленных замен */}
      <ReplacementList />

      {/* Модальное окно создания отдела*/}
      <CreateDepartament />
    </div>
  );
}
