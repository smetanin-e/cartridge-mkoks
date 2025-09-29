'use client';
import React from 'react';
import { useCartridgeStore } from '../store/cartridges';
import { CARTRIDGE_STATUS_CONFIG } from '../constants';
import { StatsCard } from './stats-card';
import { CartridgeStatus } from '@prisma/client';
import { Button } from './ui';
import { useTheme } from 'next-themes';

interface Props {
  className?: string;
}

export const Stats: React.FC<Props> = () => {
  const cartridges = useCartridgeStore((state) => state.cartridges);
  const statuses = Object.keys(CARTRIDGE_STATUS_CONFIG) as CartridgeStatus[];

  const { theme, setTheme } = useTheme();

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6'>
      {statuses.map((status) => (
        <StatsCard
          key={status}
          status={status}
          count={cartridges.filter((c) => c.status === status).length}
        />
      ))}
      <div>
        The current theme is: {theme}
        <Button onClick={() => setTheme('light')}>Light Mode</Button>
        <Button onClick={() => setTheme('dark')}>Dark Mode</Button>
      </div>
    </div>
  );
};
