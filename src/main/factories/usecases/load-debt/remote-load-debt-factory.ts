import { RemoteLoadDebt } from '@/data/usecases';
import { LoadDebt } from '@/domain/usecases';
import { makeApiUrl, makeAxiosHttpClient } from '../../http';

export const makeRemoteLoadDebt = (id: string): LoadDebt =>
  new RemoteLoadDebt(makeApiUrl(`/divida/${id}`), makeAxiosHttpClient());
