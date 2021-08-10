import React from 'react';

import Debt from '@/presentation/pages/debt/debt';
import users from '@/users.json';
import { makeRemoteSaveDebt } from '../../usecases';

export const makeDebt: React.FC = () => {
  return <Debt saveDebt={makeRemoteSaveDebt()} users={users} />;
};
