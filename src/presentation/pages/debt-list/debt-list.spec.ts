import { LoadDebtListSpy } from '@/domain/test/mock-debt-list';
import { renderWithHistory } from '@/presentation/test/render-helper';
import DebtList from './debt-list';

import { createMemoryHistory } from 'history';
import { waitFor, screen } from '@testing-library/react';

describe('DebtList', () => {
  test('Should render DebtItems on success', async () => {
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const loadDebtListSpy = new LoadDebtListSpy();
    renderWithHistory({
      history,
      Page: () => DebtList({ loadDebtList: loadDebtListSpy }),
    });
    expect(loadDebtListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  });
});
