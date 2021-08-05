import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';
import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        params: {
          uuid: 'f8fc3eeb-d0e7-4462-9c62-408a4435bd8e',
        },
      });
    } catch (error) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data.result,
    };
  }
}
