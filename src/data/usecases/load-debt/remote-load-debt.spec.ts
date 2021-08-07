import { HttpClientSpy } from '@/data/test';
import faker from 'faker';
import { RemoteLoadDebt } from './remote-load-debt.';

type SutTypes = {
  sut: RemoteLoadDebt;
  httpClientSpy: HttpClientSpy;
};
const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteLoadDebt(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteLoadDebt', () => {
  test('Should call HttPClient with correct URL and method', async () => {
    const url = faker.internet.url();
    const { httpClientSpy, sut } = makeSut(url);
    await sut.load();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });
});
