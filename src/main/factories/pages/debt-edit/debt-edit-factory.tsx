import React from 'react';
import { useParams } from 'react-router-dom';

import DebtEdit from '@/presentation/pages/debt-edit/debt-edit';
import users from '@/users.json';
import { makeRemoteLoadDebt, makeRemoteSaveEditDebt } from '../../usecases';

type ParamsProps = {
  id: string;
};

export const makeEditDebt: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { id } = useParams<ParamsProps>();
  return (
    <DebtEdit
      saveDebt={makeRemoteSaveEditDebt(id)}
      loadDebt={makeRemoteLoadDebt(id)}
      users={users}
    />
  );
};
