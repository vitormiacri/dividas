import faker from 'faker';
import { RemoteDebtModel } from '../models';

export const mockRemoteDebtModel = (): RemoteDebtModel => ({
  _id: faker.datatype.uuid(),
  idUsuario: faker.datatype.number(),
  nome: faker.internet.userName(),
  motivo: faker.random.words(),
  valor: faker.datatype.number(),
  criado: faker.date.recent().toISOString(),
});

export const mockRemoteDebtListModel = (): RemoteDebtModel[] => [
  mockRemoteDebtModel(),
  mockRemoteDebtModel(),
  mockRemoteDebtModel(),
];
