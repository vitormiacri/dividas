import faker from 'faker';
import { RemoteSaveDebtModel } from '../models';

export const mockRemoteSaveDebtModel = (): RemoteSaveDebtModel => ({
  success: faker.datatype.boolean(),
});
