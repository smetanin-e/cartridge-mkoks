import { ServiceFormType } from '@/shared/schemas/service-schema';

export type ServiceButchDTO = ServiceFormType & { cartridges: number[] };
