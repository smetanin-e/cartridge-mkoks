import React from 'react';
import { CustomSelect } from './components/form/custom-select';
import { useCartridgeStore } from './store/cartridges';
import { useModelsStore } from './store/cartridge-models';
import { CartridgeDTO, CartridgeModelDTO } from './services/dto/cartridge-model.dto.';
import { Badge } from './components/ui';
import { getStatusBadge } from './components/utils';
import { Departament } from '@prisma/client';
import { useDepartamentStore } from './store/departaments';

interface Props {
  className?: string;
}

export const Test: React.FC<Props> = () => {
  const { cartridges } = useCartridgeStore();
  const { models } = useModelsStore();
  const { departaments } = useDepartamentStore();
  const [selected, setSelected] = React.useState<CartridgeDTO | null>(null);
  const [selectedM, setSelectedM] = React.useState<CartridgeModelDTO | null>(null);
  const [selectedD, setSelectedD] = React.useState<Departament | null>(null);
  return (
    <div className='mt-12 w-[350px]'>
      <h1>TEST</h1>
      <CustomSelect<CartridgeDTO>
        items={cartridges}
        value={selected}
        onChange={setSelected}
        getKey={(c) => c.id}
        getLabel={(c) => c.number}
        placeholder='Выберите картридж'
        renderValue={(c) => (
          <div className='flex gap-2 items-center flex-1'>
            <span>{c.number}</span>
            <Badge variant='secondary'>{c.model?.model}</Badge>
            {getStatusBadge(c.status)}
          </div>
        )}
        renderItem={(c, selected) => (
          <div className='grid grid-cols-[auto_1fr_auto] items-center gap-2 w-full'>
            <div>{c.number}</div>
            <Badge variant='outline'>
              <strong>{c.model?.model}</strong>
            </Badge>
            <div>{getStatusBadge(c.status)}</div>
          </div>
        )}
      />

      <CustomSelect<CartridgeModelDTO>
        items={models}
        value={selectedM}
        onChange={setSelectedM}
        getKey={(c) => c.id}
        getLabel={(c) => c.model}
        placeholder='Выберите модель'
        renderItem={(c, selected) => c.model}
      />
      <CustomSelect<Departament>
        items={departaments}
        value={selectedD}
        onChange={setSelectedD}
        getKey={(c) => c.id}
        getLabel={(c) => c.name}
        placeholder='Выберите отдел'
        renderItem={(c, selected) => c.name}
      />
    </div>
  );
};
