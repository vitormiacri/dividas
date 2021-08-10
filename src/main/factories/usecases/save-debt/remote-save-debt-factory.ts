import { RemoteSaveDebt } from '@/data/usecases/save-debt/remote-save-debt';
import { SaveDebt } from '@/domain/usecases';
import { makeApiUrl, makeAxiosHttpClient } from '../../http';

export const makeRemoteSaveDebt = (): SaveDebt =>
  new RemoteSaveDebt(makeApiUrl('/divida'), makeAxiosHttpClient());
