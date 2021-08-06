import { LoadDebtListSpy } from '@/domain/test/mock-debt-list';
import { renderWithHistory } from '@/presentation/test/render-helper';
import DebtList from './debt-list';

import { createMemoryHistory, MemoryHistory } from 'history';
import { waitFor, screen, RenderResult } from '@testing-library/react';

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
    const debtList = screen.getByTestId('debt-list');
    await waitFor(() => debtList);

    expect(debtList.querySelectorAll('tr')).toHaveLength(3);
  });
});
