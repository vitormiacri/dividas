import { DebtModel } from '@/domain/models';
import { LoadDebtList } from '@/domain/usecases';
import React, { useEffect, useState } from 'react';

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
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Motivo</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody data-testid="debt-list">
            {state.debts.length > 0 ? (
              state.debts.map((debt) => (
                <tr key={debt.idUsuario}>
                  <td>{debt.idUsuario}</td>
                  <td>{debt.motivo}</td>
                  <td>{debt.valor}</td>
                  <td>{debt.data.toLocaleDateString('pt-br')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Vazio</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DebtList;
