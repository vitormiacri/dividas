import { LoadDebtListSpy } from '@/domain/test/mock-debt-list';
import { renderWithHistory } from '@/presentation/test/render-helper';
import DebtList from './debt-list';

import { createMemoryHistory, MemoryHistory } from 'history';
import {
  waitFor,
  screen,
  RenderResult,
  fireEvent,
} from '@testing-library/react';

type SutTypes = {
  history: MemoryHistory;
  loadDebtListSpy: LoadDebtListSpy;
  sut: RenderResult;
};

const makeSut = (loadDebtListSpy = new LoadDebtListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const { sut } = renderWithHistory({
    history,
    Page: () => DebtList({ loadDebtList: loadDebtListSpy }),
  });
  return {
    sut,
    history,
    loadDebtListSpy,
  };
};

describe('DebtList', () => {
  test('Should call LoadSurveyList', async () => {
    const { loadDebtListSpy } = makeSut();
    expect(loadDebtListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  });

  test('Should render DebtItems on success', async () => {
    makeSut();
    await waitFor(() => screen.getByTestId('debt-list'));
    const debtList = screen.getByTestId('debt-list');
    expect(debtList.querySelectorAll('tr')).toHaveLength(3);
  });

  test('Should go to add new Debt page', async () => {
    const { history } = makeSut();
    const addDebt = screen.getByTestId('addDebt');
    fireEvent.click(addDebt);
    expect(history.location.pathname).toBe('/add-debt');
    await waitFor(() => screen.getByRole('heading'));
  });

  test('Should go to Debt page', async () => {
    const loadDebtListSpy = new LoadDebtListSpy();
    const { sut, history } = makeSut(loadDebtListSpy);
    await waitFor(() => sut.getByTestId('debt-list'));
    const debtItem = sut.getAllByTestId('debtItem');
    fireEvent.click(debtItem[0]);
    expect(history.location.pathname).toBe(
      `/debt/${loadDebtListSpy.debts[0]._id}`
    );
  });

  test('Should render empty component if no content', async () => {
    const loadDebtListSpy = new LoadDebtListSpy();
    loadDebtListSpy.debts = [];
    makeSut(loadDebtListSpy);
    await waitFor(() => screen.getByTestId('empty'));
    expect(screen.getByTestId('empty')).toBeInTheDocument();
  });
});
