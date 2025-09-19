'use client';
import React from 'react';
import { useCartridgeStore } from '../store/cartridges';
import { CARTRIDGE_STATUS_CONFIG } from '../constants';
import { StatsCard } from './stats-card';
import { CartridgeStatus } from '@prisma/client';

interface Props {
  className?: string;
}

export const Stats: React.FC<Props> = () => {
  const cartridges = useCartridgeStore((state) => state.cartridges);
  const statuses = Object.keys(CARTRIDGE_STATUS_CONFIG) as CartridgeStatus[];

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6'>
      {statuses.map((status) => (
        <StatsCard
          key={status}
          status={status}
          count={cartridges.filter((c) => c.status === status).length}
        />
      ))}
    </div>
  );
};
