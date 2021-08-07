import { RemoteSaveDebtModel } from '@/data/models';
import { HttpClient, HttpMethod, HttpStatusCode } from '@/data/protocols/http';
import { SaveDebt, SaveDebtParams } from '@/domain/usecases';

export class RemoteSaveDebt implements SaveDebt {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSaveDebtModel>
  ) {}

  async save(params: SaveDebtParams, method: HttpMethod): Promise<boolean> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method,
      body: params,
    });
    const remoteSaveDebt = httpResponse.body;
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteSaveDebt.success;
    }
  }
}
