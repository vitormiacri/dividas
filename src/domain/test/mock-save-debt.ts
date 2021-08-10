import { HttpMethod } from '@/data/protocols/http';
import { SaveDebt, SaveDebtParams } from '../usecases';

export class SaveDebtSpy implements SaveDebt {
  callsCount = 0;
  params: SaveDebtParams;
  response: boolean;

  async save(params: SaveDebtParams, method: HttpMethod): Promise<boolean> {
    this.callsCount++;
    this.params = params;
    return true;
  }
}
