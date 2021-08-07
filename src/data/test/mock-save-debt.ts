import { SaveDebtParams } from '@/domain/usecases';
import faker from 'faker';

export const mockSaveDebtParams = (): SaveDebtParams => ({
  idUsuario: faker.datatype.number(),
  motivo: faker.random.words(),
  valor: faker.datatype.number(),
});
