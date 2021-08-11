import { createMemoryHistory, MemoryHistory } from 'history';
import {
  cleanup,
  fireEvent,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { LoadDebtSpy, mockSaveDebtParams, SaveDebtSpy } from '@/domain/test';
import { renderWithHistory } from '@/presentation/test/render-helper';
import users from '@/users.json';
import DebtEdit from './debt-edit';

type SutTypes = {
  sut: RenderResult;
  saveDebtSpy: SaveDebtSpy;
  loadDebtSpy: LoadDebtSpy;
  history: MemoryHistory;
};

const options = users.map((u) => ({
  value: u.id,
  label: u.name,
}));

const makeSut = (
  saveDebtSpy = new SaveDebtSpy(),
  loadDebtSpy = new LoadDebtSpy()
): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/edit-debt'] });
  const { sut } = renderWithHistory({
    history,
    Page: () =>
      DebtEdit({ saveDebt: saveDebtSpy, loadDebt: loadDebtSpy, users }),
  });
  return {
    sut,
    saveDebtSpy,
    loadDebtSpy,
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

const simulateFormSubmit = async (
  sut: RenderResult,
  params = mockSaveDebtParams()
): Promise<void> => {
  const motivoInput = sut.getByTestId('motivo') as HTMLInputElement;
  const valorInput = sut.getByTestId('valor') as HTMLInputElement;
  const usuario = options[0].label;
  await populateSelect(sut, usuario);
  fireEvent.input(motivoInput, { target: { value: params.motivo } });
  fireEvent.input(valorInput, { target: { value: params.valor } });
  const form = sut.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

describe('Debt Edit Component', () => {
  beforeEach(() => cleanup());

  test('Should call LoadDebt on start', async () => {
    const { sut, loadDebtSpy } = makeSut();
    await waitFor(() => sut.getByTestId('motivo'));
    expect(loadDebtSpy.callsCount).toBe(1);
  });

  test('Should fill all fields after calls LoadDebt', async () => {
    const saveDebtSpy = new SaveDebtSpy();
    const loadDebtSpy = new LoadDebtSpy();
    const id = 4;
    loadDebtSpy.debt.idUsuario = id;
    const { sut } = makeSut(saveDebtSpy, loadDebtSpy);
    const motivo = sut.getByTestId('motivo') as HTMLInputElement;
    const valor = sut.getByTestId('valor') as HTMLInputElement;
    await waitFor(() => valor);
    const usuario = options[id].label;
    await populateSelect(sut, usuario);
    const selectedUser = sut.getByText(usuario);
    expect(selectedUser.textContent).toBe(usuario);
    expect(motivo.value).toBe(loadDebtSpy.debt.motivo);
    expect(valor.value).toBe(String(loadDebtSpy.debt.valor));
  });

  test('Should call SaveDebt with correct values', async () => {
    const { saveDebtSpy, sut } = makeSut();
    const params = mockSaveDebtParams();
    await simulateFormSubmit(sut, params);
    expect(saveDebtSpy.params).toEqual({
      idUsuario: options[0].value,
      motivo: params.motivo,
      valor: params.valor,
    });
  });

  test('Should go to Debt List Page after save Debt', async () => {
    const { history, sut } = makeSut();
    await simulateFormSubmit(sut);
    expect(history.location.pathname).toBe('/');
  });

  test('Should go to Debt List Page after click in back link', async () => {
    const { history, sut } = makeSut();
    const backLink = sut.getByTestId('goBackLink');
    fireEvent.click(backLink);
    expect(history.location.pathname).toBe('/');
    await waitFor(() => backLink);
  });
});
