'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FormInput, FormSelect } from '@/shared/components';
import { shortName } from '@/shared/lib';
import { UserRole } from '@prisma/client';
import { useUserStore } from '@/shared/store/user';
import { useAgentStore } from '@/shared/store/agents';
import { convertAgentsForSelect } from '@/shared/lib/convert-agents-for-select';

export const ResponsibleForm: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const currentResponsible = watch('responsible');
  const currentUser = useUserStore((state) => state.user);
  const agents = useAgentStore((state) => state.agents);

  React.useEffect(() => {
    if (!currentUser || !agents?.length) return;

    // если уже есть значение (например, пользователь выбрал вручную) — не перезаписываем
    if (currentResponsible) return;

    const foundAgent = agents.find((a) => a.id === currentUser.id);
    if (foundAgent) {
      setValue('responsible', shortName(foundAgent));
    }
  }, [currentUser, agents, setValue, currentResponsible]);

  if (!currentUser) return null;

  return currentUser.role === UserRole.ADMIN ? (
    <FormSelect
      name='responsible'
      label='Ответственный'
      required
      data={convertAgentsForSelect(agents)}
    />
  ) : (
    <FormInput
      name='responsible'
      label='Ответственный'
      type='text'
      required
      readOnly
      value={shortName(currentUser)}
    />
  );
};
