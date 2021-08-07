import { HttpMethod } from '@/data/protocols/http';

export type SaveDebtParams = {
  idUsuario: number;
  motivo: string;
  valor: number;
};

export interface SaveDebt {
  save(params: SaveDebtParams, method: HttpMethod): Promise<boolean>;
}
