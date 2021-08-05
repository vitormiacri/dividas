import faker from 'faker';
import { DebtModel } from '../models';
import { LoadDebtList } from '../usecases';

export const mockDebtModel = (): DebtModel => ({
  _id: faker.datatype.uuid(),
  idUsuario: faker.datatype.number(),
  motivo: faker.random.words(),
  valor: faker.datatype.number(),
  data: faker.date.recent(),
});

export const mockDebtListModel = (): DebtModel[] => [
  mockDebtModel(),
  mockDebtModel(),
  mockDebtModel(),
];

export class LoadDebtListSpy implements LoadDebtList {
  callsCount = 0;
  debts = mockDebtListModel();

  async loadAll(): Promise<DebtModel[]> {
    this.callsCount++;
    return this.debts;
  }
}
