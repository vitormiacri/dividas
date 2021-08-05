import axios from 'axios';
import { mockHttpRequest } from '@/data/test';
import { mockAxios, mockHttpResponse } from '@/infra/test/mock-axios';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};
describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockHttpRequest();
    const { sut, mockedAxios } = makeSut();

    await sut.request(request);

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      method: request.method,
      data: request.body,
      params: {
        uuid: 'f8fc3eeb-d0e7-4462-9c62-408a4435bd8e',
      },
    });
  });

  test('Should return correct error', async () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse(),
    });

    const promise = sut.request(mockHttpRequest());
    expect(promise).toEqual(mockedAxios.request.mock.results[0].value);
  });
});
