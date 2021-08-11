import { DebtModel } from '../models';
import { LoadDebt } from '../usecases';
import { mockDebtModel } from './mock-debt-list';

export class LoadDebtSpy implements LoadDebt {
  callsCount = 0;
  debt = mockDebtModel();

  async load(): Promise<DebtModel> {
    this.callsCount++;
    return this.debt;
  }
}
