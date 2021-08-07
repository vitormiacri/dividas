import React, { useCallback, useEffect, useState } from 'react';

import { DebtModel, UserModel } from '@/domain/models';
import { LoadDebtList } from '@/domain/usecases';
import { DebListItem, EmptyList } from './components';
import Styles from './debt-list-styles.scss';
import { useHistory } from 'react-router-dom';

type State = {
  debts: DebtModel[];
};

type Props = {
  loadDebtList: LoadDebtList;
  users: UserModel[];
};

const DebtList: React.FC<Props> = ({ loadDebtList, users }) => {
  const history = useHistory();
  const [state, setState] = useState<State>({
    debts: [],
  });

  const handleAddClick = useCallback(() => {
    history.push('/add-debt');
  }, []);

  useEffect(() => {
    loadDebtList.loadAll().then((debts) => {
      setState((old) => ({
        ...old,
        debts,
      }));
    });
  }, []);

  return (
    <div className={Styles.debtList}>
      <div className={Styles.card}>
        <div className={Styles.header}>
          <h1>Dívidas</h1>
          <button type="button" onClick={handleAddClick} data-testid="addDebt">
            Adicionar
          </button>
        </div>
        {state.debts.length ? (
          <DebListItem debtList={state.debts} users={users} />
        ) : (
          <EmptyList />
        )}
      </div>
    </div>
  );
};

export default DebtList;
