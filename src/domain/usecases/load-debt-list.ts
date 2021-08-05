import { DebtModel } from '../models';

export interface LoadDebtList {
  loadAll: () => Promise<DebtModel[]>;
}
