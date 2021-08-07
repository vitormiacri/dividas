import { HttpClient, HttpMethod } from '@/data/protocols/http';
import { SaveDebtParams } from '@/domain/usecases';

export class RemoteSaveDebt {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<true>
  ) {}

  async save(params: SaveDebtParams, method: HttpMethod): Promise<void> {
    await this.httpClient.request({
      url: this.url,
      method,
      body: params,
    });
  }
}
