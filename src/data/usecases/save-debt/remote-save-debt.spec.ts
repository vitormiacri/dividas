import faker from 'faker';

import { HttpClientSpy, mockSaveDebtParams } from '@/data/test';
import { RemoteSaveDebt } from './remote-save-debt';

describe('RemoteSaveDebt', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteSaveDebt(url, httpClientSpy);
    const saveDebtParams = mockSaveDebtParams();
    const method = 'put';
    await sut.save(saveDebtParams, method);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe(method);
    expect(httpClientSpy.body).toBe(saveDebtParams);
  });
});
