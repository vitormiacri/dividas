import { LoadDebtList } from '@/domain/usecases';
import { DebtModel } from '@/domain/models';
import { UnexpectedError } from '@/domain/erros/unexpected-error';
import { RemoteDebtModel } from '@/data/models/remote-debt-model';
import { HttpClient, HttpStatusCode } from '@/data/protocols/http';

export class RemoteLoadDebtList implements LoadDebtList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteDebtModel[]>
  ) {}

  async loadAll(): Promise<DebtModel[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'get',
    });
    const remoteDebts = httpResponse.body || [];
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteDebts.map((remoteDebt) => ({
          ...remoteDebt,
          data: new Date(remoteDebt.data),
        }));
      case HttpStatusCode.badRequest:
        throw new UnexpectedError();
      default:
        throw new UnexpectedError();
    }
  }
}
