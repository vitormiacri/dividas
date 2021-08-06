import { DebtModel } from '@/domain/models';
import Styles from './list-styles.scss';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

type Props = {
  debtList: DebtModel[];
};

const List: React.FC<Props> = ({ debtList }) => {
  const history = useHistory();

  const handleEditDebt = useCallback((id: string) => {
    history.push(`/debt/${id}`);
  }, []);

  return (
    <table className={Styles.table}>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Motivo</th>
          <th>Valor</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody data-testid="debt-list">
        {debtList.map((debt) => (
          <tr
            key={debt._id}
            onClick={() => handleEditDebt(debt._id)}
            data-testid="debtItem"
          >
            <td>{debt.idUsuario}</td>
            <td>{debt.motivo}</td>
            <td>{debt.valor}</td>
            <td>{debt.data.toLocaleDateString('pt-br')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
