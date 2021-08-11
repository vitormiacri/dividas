import faker from 'faker';
import { HttpClientSpy } from '@/data/test';
import { RemoteDeleteDebt } from './remote-delete-debt';
import { HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/erros/unexpected-error';

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

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.delete();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
