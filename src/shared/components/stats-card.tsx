import React from 'react';
import { Card, CardContent } from '@/shared/components/ui';
import { CARTRIDGE_STATUS_CONFIG } from '../constants';

import { CartridgeStatus } from '@prisma/client';
import { LoadingBounce } from './loading-bounce';
import { CartridgeDTO } from '../services/dto/cartridge-model.dto.';

interface Props {
  className?: string;
  status: CartridgeStatus;
  cartridges: CartridgeDTO[];
  loading: boolean;
}

export const StatsCard: React.FC<Props> = ({ status, cartridges, loading }) => {
  const count = cartridges.filter((c) => c.status === status).length;
  const config = CARTRIDGE_STATUS_CONFIG[status];
  const Icon = config.icon;
  return (
    <Card className='relative min-h-[134px]'>
      {loading ? (
        <LoadingBounce />
      ) : (
        <CardContent className='p-4'>
          <div className='flex items-center space-x-4'>
            <Icon className={`${config.textColor} h-12 w-12`} />
            <div>
              <p className='text-3xl font-bold'>{count}</p>
              <p className='text-xs text-muted-foreground'>{config.label}</p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
