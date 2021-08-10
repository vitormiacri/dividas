import { RemoteLoadDebtList } from '@/data/usecases';
import { LoadDebtList } from '@/domain/usecases';
import { makeApiUrl, makeAxiosHttpClient } from '../../http';

export const makeRemoteLoadDebtList = (): LoadDebtList =>
  new RemoteLoadDebtList(makeApiUrl('/divida'), makeAxiosHttpClient());
