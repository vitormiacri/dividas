import faker from 'faker';
import { HttpMethod } from '@/data/protocols/http';
import { SaveDebt, SaveDebtParams } from '../usecases';

export const mockSaveDebtParams = (): SaveDebtParams => {
  return {
    idUsuario: faker.datatype.number(),
    motivo: faker.random.words(),
    valor: faker.datatype.number(),
  };
};

export class SaveDebtSpy implements SaveDebt {
  callsCount = 0;
  params: SaveDebtParams;

  async save(params: SaveDebtParams, method: HttpMethod): Promise<boolean> {
    this.callsCount++;
    this.params = params;
    return true;
  }
}
