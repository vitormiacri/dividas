import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Context from '@/presentation/contexts/form/form-context';
import { Card, Input, Select } from '@/presentation/components';
import Styles from './debt-styles.scss';

const options = [
  { value: 1, label: 'Usuário 1' },
  { value: 2, label: 'Usuário 2' },
  { value: 3, label: 'Usuário 3' },
];

const Debt: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false,
    idUsuario: 0,
    motivo: '',
    valor: '',
  });

  return (
    <div className={Styles.debtContent}>
      <Card>
        <div className={Styles.header}>
          <Link to="/" className={Styles.link}>
            Voltar
          </Link>
          <h1>Adicionar Dívida</h1>
        </div>
        <div className={Styles.backgroundTop}></div>
        <Context.Provider value={{ state, setState }}>
          <form className={Styles.form}>
            <Select options={options} />
            <Input type="text" name="motivo" placeholder="Informe o motivo" />
            <Input type="text" name="valor" placeholder="Informe o valor" />
            <button type="submit">Salvar</button>
          </form>
        </Context.Provider>
      </Card>
    </div>
  );
};

export default Debt;
