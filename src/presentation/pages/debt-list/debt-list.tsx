import { LoadDebtList } from '@/domain/usecases';
import React, { useEffect } from 'react';

import Styles from './debt-list-styles.scss';

type Props = {
  loadDebtList: LoadDebtList;
};
const DebtList: React.FC<Props> = ({ loadDebtList }) => {
  useEffect(() => {
    loadDebtList.loadAll().then((debts) => {
      console.log(debts);
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
          <tbody>
            <tr>
              <td>Cliente 1</td>
              <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</td>
              <td>R$ 10,00</td>
              <td>01/08/2021</td>
            </tr>
            <tr>
              <td>Cliente 2</td>
              <td>Motivo 2</td>
              <td>R$ 112,00</td>
              <td>18/08/2021</td>
            </tr>
            <tr>
              <td>Cliente 3</td>
              <td>Motivo 3</td>
              <td>R$ 210,00</td>
              <td>15/08/2021</td>
            </tr>
            <tr>
              <td>Cliente 4</td>
              <td>Motivo 4</td>
              <td>R$ 320,00</td>
              <td>11/08/2021</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DebtList;
