import faker from 'faker';
import { RemoteDebtModel } from '../models/remote-debt-model';
import { HttpClientSpy } from '../test/mock-http';
import { RemoteLoadDebtList } from './remote-load-debt-list';

type SutTypes = {
  sut: RemoteLoadDebtList;
  httpClientSpy: HttpClientSpy<RemoteDebtModel[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteDebtModel[]>();
  const sut = new RemoteLoadDebtList(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteLoadDebtList', () => {
  test('Should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);

    await sut.loadAll();

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });
});
