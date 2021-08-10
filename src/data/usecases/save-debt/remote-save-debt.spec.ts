import faker from 'faker';

import {
  HttpClientSpy,
  mockRemoteSaveDebtModel,
  mockSaveDebtParams,
} from '@/data/test';
import { RemoteSaveDebt } from './remote-save-debt';
import { HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/erros/unexpected-error';

type SutTypes = {
  sut: RemoteSaveDebt;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new RemoteSaveDebt(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteSaveDebt', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSaveDebtModel(),
    };
    const saveDebtParams = mockSaveDebtParams();
    const method = 'put';
    await sut.save(saveDebtParams, method);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe(method);
    expect(httpClientSpy.body).toBe(saveDebtParams);
  });

  test('Should return true on 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    const response = mockRemoteSaveDebtModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: response,
    };

    const httpResponse = await sut.save(mockSaveDebtParams(), 'post');
    expect(httpResponse).toBe(response.success);
  });

  test('Should throw UnexpectedError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.save(mockSaveDebtParams(), 'post');

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.save(mockSaveDebtParams(), 'post');

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
