import { BATCH_STATUS } from '@/shared/constants/cartridge-status';
import { BatchStatus } from '@prisma/client';
import { Badge } from '@/shared/components/ui';

export const getBatchStatusBadge = (status: BatchStatus) => {
  const config = BATCH_STATUS[status];
  const Icon = config.icon;
  return (
    <Badge className={`${config.color} text-white flex items-center gap-1`}>
      <Icon className='h-3 w-3' />
      {config.label}
    </Badge>
  );
};
