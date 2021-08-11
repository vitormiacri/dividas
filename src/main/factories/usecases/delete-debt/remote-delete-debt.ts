import { RemoteDeleteDebt } from '@/data/usecases';
import { DeleteDebt } from '@/domain/usecases';
import { makeApiUrl, makeAxiosHttpClient } from '../../http';

export const makeRemoteDeleteDebt = (id: string): DeleteDebt =>
  new RemoteDeleteDebt(makeApiUrl(`/divida/${id}`), makeAxiosHttpClient());
