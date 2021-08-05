import faker from 'faker';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '../protocols/http';

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;
  method?: string;
  body?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    return this.response;
  }
}

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.random.objectElement(),
  params: 'f8fc3eeb-d0e7-4462-9c62-408a4435bd8e',
});
