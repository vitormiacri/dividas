import { createMemoryHistory, MemoryHistory } from 'history';
import { SaveDebtSpy } from '@/domain/test/mock-save-debt';
import {
  cleanup,
  fireEvent,
  RenderResult,
  waitFor,
} from '@testing-library/react';
import { renderWithHistory } from '@/presentation/test/render-helper';
import users from '@/users.json';
import Debt from './debt';
import { mockRemoteSaveDebtParams } from '@/data/test';
import { UnexpectedError } from '@/domain/erros/unexpected-error';

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

const simulateFormSubmit = async (
  sut: RenderResult,
  params = mockRemoteSaveDebtParams()
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

describe('Debt Component', () => {
  beforeEach(cleanup);

  test('Should start with initial state', () => {
    const { sut } = makeSut();
    const motivo = sut.getByTestId('motivo') as HTMLInputElement;
    const valor = sut.getByTestId('valor') as HTMLInputElement;
    expect(motivo.value).toBe('');
    expect(valor.value).toBe('');
  });

  test('Should call SaveDebt with correct values', async () => {
    const { saveDebtSpy, sut } = makeSut();
    const params = mockRemoteSaveDebtParams();
    await simulateFormSubmit(sut, params);
    expect(saveDebtSpy.params).toEqual({
      idUsuario: options[0].value,
      motivo: params.motivo,
      valor: params.valor,
    });
  });

  test('Should call SaveDebt only once', async () => {
    const { saveDebtSpy, sut } = makeSut();
    await simulateFormSubmit(sut);
    expect(saveDebtSpy.callsCount).toBe(1);
  });

  test('Should show alert if submit fails', async () => {
    const saveDebtSpy = new SaveDebtSpy();
    const error = new UnexpectedError();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(saveDebtSpy, 'save').mockRejectedValueOnce(error);
    const { sut } = makeSut(saveDebtSpy);
    const form = sut.getByTestId('form');
    fireEvent.submit(form);
    await waitFor(() => form);
    expect(window.alert).toBeCalledTimes(1);
  });

  test('Should go to Debt List Page after click in back link', async () => {
    const { history, sut } = makeSut();
    const backLink = sut.getByTestId('goBackLink');
    fireEvent.click(backLink);
    expect(history.location.pathname).toBe('/');
  });

  test('Should go to Debt List Page after save Debt', async () => {
    const { history, sut } = makeSut();
    await simulateFormSubmit(sut);
    expect(history.location.pathname).toBe('/');
  });
});
