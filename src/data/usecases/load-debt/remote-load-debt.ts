import { RemoteDebtModel } from '@/data/models';
import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/erros/unexpected-error';
import { DebtModel } from '@/domain/models';
import { LoadDebt } from '@/domain/usecases/load-debt';

export class RemoteLoadDebt implements LoadDebt {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteDebtModel>
  ) {}

  async load(): Promise<DebtModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
    });
    const remoteDebt = httpResponse.body;
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return {
          ...remoteDebt,
          criado: new Date(remoteDebt.criado),
        };
      case HttpStatusCode.serverError:
        throw new UnexpectedError();
      case HttpStatusCode.badRequest:
        throw new UnexpectedError();
    }
  }
}
