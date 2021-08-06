import { DebtModel } from '@/domain/models';
import { LoadDebtList } from '@/domain/usecases';
import React, { useEffect, useState } from 'react';
import { DebListItem } from './components';

import Styles from './debt-list-styles.scss';

type State = {
  debts: DebtModel[];
};

type Props = {
  loadDebtList: LoadDebtList;
};
const DebtList: React.FC<Props> = ({ loadDebtList }) => {
  const [state, setState] = useState<State>({
    debts: [],
  });

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
          <button>Novo</button>
        </div>
        <DebListItem debtList={state.debts} />
      </div>
    </div>
  );
};

export default DebtList;
