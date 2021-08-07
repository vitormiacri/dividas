import { HttpClientSpy } from '@/data/test';
import faker from 'faker';
import { RemoteLoadDebt } from './remote-load-debt.';

describe('RemoteLoadDebt', () => {
  test('Should call HttPClient with correct URL and method', async () => {
    const url = faker.internet.url();
    const httpClientSpy = new HttpClientSpy();
    const sut = new RemoteLoadDebt(url, httpClientSpy);
    sut.load();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });
});
