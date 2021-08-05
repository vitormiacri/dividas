import faker from 'faker';
import { UnexpectedError } from '@/domain/erros/unexpected-error';
import { RemoteDebtModel } from '@/data/models/remote-debt-model';
import { HttpStatusCode } from '@/data/protocols/http';
import { HttpClientSpy } from '@/data/test/mock-http';
import { mockRemoteDebtListModel } from '@/data/test/mock-remote-debt-list';
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

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const promise = sut.loadAll();

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should return a list of DebtModels if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const httpResult = mockRemoteDebtListModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };

    const debtList = await sut.loadAll();

    expect(debtList).toEqual([
      {
        idUsuario: httpResult[0].idUsuario,
        motivo: httpResult[0].motivo,
        valor: httpResult[0].valor,
        data: new Date(httpResult[0].data),
      },
      {
        idUsuario: httpResult[1].idUsuario,
        motivo: httpResult[1].motivo,
        valor: httpResult[1].valor,
        data: new Date(httpResult[1].data),
      },
      {
        idUsuario: httpResult[2].idUsuario,
        motivo: httpResult[2].motivo,
        valor: httpResult[2].valor,
        data: new Date(httpResult[2].data),
      },
    ]);
  });
});
