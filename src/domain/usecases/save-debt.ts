export type SaveDebtParams = {
  idUsuario: number;
  motivo: string;
  valor: number;
};

export interface SaveDebt {
  save(params: SaveDebtParams): Promise<string>;
}
