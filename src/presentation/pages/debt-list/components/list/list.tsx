import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { DebtModel, UserModel } from '@/domain/models';
import Styles from './list-styles.scss';

type Props = {
  debtList: DebtModel[];
  users: UserModel[];
};

const List: React.FC<Props> = ({ debtList, users }) => {
  const history = useHistory();

  const handleEditDebt = useCallback(
    (id: string) => {
      history.push(`/debt/${id}`);
    },
    [history]
  );

  const getUserName = useCallback(
    (idUser: number): string => {
      const findUser = users.find((u) => u.id === idUser);
      return findUser ? findUser.name : '';
    },
    [users]
  );

  const formatMoney = useCallback((value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
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
            <td>{getUserName(debt.idUsuario)}</td>
            <td>{debt.motivo}</td>
            <td>{formatMoney(debt.valor)}</td>
            <td>{debt.criado.toLocaleDateString('pt-br')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
