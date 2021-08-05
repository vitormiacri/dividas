import faker from 'faker';
import { RemoteDebtModel } from '../models';

export const mockRemoteDebtModel = (): RemoteDebtModel => ({
  idUsuario: faker.datatype.number(),
  motivo: faker.random.words(),
  valor: faker.datatype.number(),
  data: faker.date.recent().toISOString(),
});

export const mockRemoteDebtListModel = (): RemoteDebtModel[] => [
  mockRemoteDebtModel(),
  mockRemoteDebtModel(),
  mockRemoteDebtModel(),
];
