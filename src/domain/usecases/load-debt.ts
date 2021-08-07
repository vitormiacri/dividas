import { DebtModel } from '../models';

export interface LoadDebt {
  load: () => Promise<DebtModel>;
}
