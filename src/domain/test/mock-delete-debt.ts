import { DeleteDebt } from '../usecases';

export class DeleteDebtSpy implements DeleteDebt {
  callsCount = 0;
  response: boolean;

  async delete(): Promise<boolean> {
    this.callsCount++;
    return this.response;
  }
}
