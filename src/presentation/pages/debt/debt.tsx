import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Context from '@/presentation/contexts/form/form-context';
import { Card, Input, Select } from '@/presentation/components';
import Styles from './debt-styles.scss';
import { SaveDebt } from '@/domain/usecases';
import { UserModel } from '@/domain/models';

type Props = {
  saveDebt: SaveDebt;
  users: UserModel[];
};

const Debt: React.FC<Props> = ({ saveDebt, users }) => {
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    idUsuario: 0,
    motivo: '',
    valor: '',
    usersOption: users.map((u) => ({
      value: u.id,
      label: u.name,
    })),
  });

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        await saveDebt.save(
          {
            idUsuario: state.idUsuario,
            motivo: state.motivo,
            valor: Number(state.valor),
          },
          'post'
        );
        history.replace('/');
      } catch (err) {
        alert(err.message);
      }
    },
    [history, saveDebt, state.idUsuario, state.motivo, state.valor]
  );

  return (
    <div className={Styles.debtContent}>
      <Card>
        <div className={Styles.header}>
          <Link data-testid="goBackLink" to="/" className={Styles.link}>
            Voltar
          </Link>
          <h1>Adicionar Dívida</h1>
        </div>
        <div className={Styles.backgroundTop}></div>
        <Context.Provider value={{ state, setState }}>
          <form
            data-testid="form"
            onSubmit={handleSubmit}
            className={Styles.form}
          >
            <Select options={state.usersOption} />
            <Input
              type="text"
              name="motivo"
              required
              placeholder="Informe o motivo"
            />
            <Input
              type="number"
              name="valor"
              required
              placeholder="Informe o valor"
            />
            <button type="submit">Salvar</button>
          </form>
        </Context.Provider>
      </Card>
    </div>
  );
};

export default Debt;
