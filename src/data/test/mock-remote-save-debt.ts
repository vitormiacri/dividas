import { SaveDebtParams } from '@/domain/usecases';
import faker from 'faker';
import { RemoteSaveDebtModel } from '../models';

export const mockRemoteSaveDebtParams = (): SaveDebtParams => ({
  idUsuario: faker.datatype.number(),
  motivo: faker.random.words(),
  valor: faker.datatype.number(),
});

export const mockRemoteSaveDebtModel = (): RemoteSaveDebtModel => ({
  success: faker.datatype.boolean(),
});
