import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/erros/unexpected-error';
import { DeleteDebt } from '@/domain/usecases/delete-debt';

export class RemoteDeleteDebt implements DeleteDebt {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<boolean>
  ) {}

  async delete(): Promise<boolean> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'delete',
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return true;
      case HttpStatusCode.badRequest:
        throw new UnexpectedError();
      case HttpStatusCode.serverError:
        throw new UnexpectedError();
      default:
        throw new UnexpectedError();
    }
  }
}
