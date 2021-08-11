import { HttpClient } from '@/data/protocols/http';
import { DeleteDebt } from '@/domain/usecases/delete-debt';

export class RemoteDeleteDebt implements DeleteDebt {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<boolean>
  ) {}

  async delete(): Promise<boolean> {
    await this.httpClient.request({
      url: this.url,
      method: 'delete',
    });
    return Promise.resolve(null);
  }
}
