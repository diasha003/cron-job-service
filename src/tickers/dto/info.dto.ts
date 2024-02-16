import { Info } from '@prisma/client';

export type InfoDto = Omit<Info, 'id'>;
