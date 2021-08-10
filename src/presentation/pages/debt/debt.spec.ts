import { createMemoryHistory, MemoryHistory } from 'history';
import { SaveDebtSpy } from '@/domain/test/mock-save-debt';
import { fireEvent, RenderResult, waitFor } from '@testing-library/react';
import { renderWithHistory } from '@/presentation/test/render-helper';
import users from '@/users.json';
import Debt from './debt';
import { mockSaveDebtParams } from '@/data/test';

type SutTypes = {
  sut: RenderResult;
  saveDebtSpy: SaveDebtSpy;
  history: MemoryHistory;
};

const options = users.map((u) => ({
  value: u.id,
  label: u.name,
}));

const makeSut = (saveDebtSpy = new SaveDebtSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/add-debt'] });
  const { sut } = renderWithHistory({
    history,
    Page: () => Debt({ saveDebt: saveDebtSpy, users }),
  });
  return {
    sut,
    saveDebtSpy,
    history,
  };
};

const populateSelect = async (
  sut: RenderResult,
  usuario: string
): Promise<void> => {
  const selectContainer = sut.getByText('Selecione um cliente');
  fireEvent.keyDown(selectContainer, { keyCode: 40 });
  await waitFor(() => sut.getByText(usuario));
  fireEvent.click(sut.getByText(usuario));
};

describe('Debt Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut();
    const motivo = sut.getByTestId('motivo') as HTMLInputElement;
    const valor = sut.getByTestId('valor') as HTMLInputElement;
    expect(motivo.value).toBe('');
    expect(valor.value).toBe('');
  });

  test('Should call SaveDebt with correct values', async () => {
    const { saveDebtSpy, sut } = makeSut();
    const saveParams = mockSaveDebtParams();
    const motivoInput = sut.getByTestId('motivo') as HTMLInputElement;
    const valorInput = sut.getByTestId('valor') as HTMLInputElement;
    const usuario = options[0].label;
    await populateSelect(sut, usuario);
    fireEvent.input(motivoInput, { target: { value: saveParams.motivo } });
    fireEvent.input(valorInput, { target: { value: saveParams.valor } });
    const form = sut.getByTestId('form');
    fireEvent.submit(form);
    await waitFor(() => form);
    expect(saveDebtSpy.params).toEqual({
      idUsuario: options[0].value,
      motivo: saveParams.motivo,
      valor: saveParams.valor,
    });
  });
});