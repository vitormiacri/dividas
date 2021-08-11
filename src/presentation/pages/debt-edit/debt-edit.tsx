import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Context from '@/presentation/contexts/form/form-context';
import { Card, Input, Select } from '@/presentation/components';
import Styles from './debt-edit-styles.scss';
import { LoadDebt, SaveDebt } from '@/domain/usecases';
import { UserModel } from '@/domain/models';

type Props = {
  saveDebt: SaveDebt;
  loadDebt: LoadDebt;
  users: UserModel[];
};

const DebtEdit: React.FC<Props> = ({ saveDebt, loadDebt, users }) => {
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
          'put'
        );
        history.replace('/');
      } catch (err) {
        alert(err.message);
      }
    },
    [history, saveDebt, state.idUsuario, state.motivo, state.valor]
  );

  useEffect(() => {
    loadDebt.load().then((debt) => {
      setState((old) => ({
        ...old,
        idUsuario: debt.idUsuario,
        motivo: debt.motivo,
        valor: String(debt.valor),
      }));
    });
  }, []);

  return (
    <div className={Styles.debtContent}>
      <Card>
        <div className={Styles.header}>
          <Link data-testid="goBackLink" to="/" className={Styles.link}>
            Voltar
          </Link>
          <h1>Atualizar Dívida</h1>
          <button type="button" data-testid="deleteDebt">
            Remover
          </button>
        </div>
        <div className={Styles.backgroundTop}></div>
        <Context.Provider value={{ state, setState }}>
          <form
            data-testid="form"
            onSubmit={handleSubmit}
            className={Styles.form}
          >
            <Select
              options={state.usersOption}
              defaultValue={state.usersOption.filter(
                (u) => u.value === state.idUsuario
              )}
            />
            <Input
              type="text"
              name="motivo"
              required
              placeholder="Informe o motivo"
              value={state.motivo}
            />
            <Input
              type="number"
              name="valor"
              required
              placeholder="Informe o valor"
              value={state.valor}
            />
            <button type="submit">Salvar</button>
          </form>
        </Context.Provider>
      </Card>
    </div>
  );
};

export default DebtEdit;
