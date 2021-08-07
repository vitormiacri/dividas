import faker from 'faker';
import { HttpClientSpy, mockRemoteDebtModel } from '@/data/test';
import { RemoteDebtModel } from '@/data/models';
import { HttpStatusCode } from '@/data/protocols/http';
import { RemoteLoadDebt } from './remote-load-debt.';
import { UnexpectedError } from '@/domain/erros/unexpected-error';

type SutTypes = {
  sut: RemoteLoadDebt;
  httpClientSpy: HttpClientSpy<RemoteDebtModel>;
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
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteDebtModel(),
    };
    await sut.load();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });

  test('Should return a Debt on 200', async () => {
    const { httpClientSpy, sut } = makeSut();
    const httpResult = mockRemoteDebtModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const httpResponse = await sut.load();
    expect(httpResponse).toEqual({
      _id: httpResult._id,
      idUsuario: httpResult.idUsuario,
      motivo: httpResult.motivo,
      nome: httpResult.nome,
      valor: httpResult.valor,
      criado: new Date(httpResult.criado),
    });
  });

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { httpClientSpy, sut } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { httpClientSpy, sut } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.load();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
