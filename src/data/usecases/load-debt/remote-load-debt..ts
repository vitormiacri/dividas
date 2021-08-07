import { HttpClient } from '@/data/protocols/http';

export class RemoteLoadDebt {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async load(): Promise<void> {
    await this.httpClient.request({
      url: this.url,
      method: 'get',
    });
  }
}
