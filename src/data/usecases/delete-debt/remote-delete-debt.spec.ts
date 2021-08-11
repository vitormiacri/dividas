import faker from 'faker';
import { HttpClientSpy } from '@/data/test';
import { RemoteDeleteDebt } from './remote-delete-debt';

type SutTypes = {
  sut: RemoteDeleteDebt;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteDeleteDebt(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteDeleteDebt', () => {
  test('Should call HttpClient with correct URL and method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);

    await sut.delete();

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('delete');
  });
});
