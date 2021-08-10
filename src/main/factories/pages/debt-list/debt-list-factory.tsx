import React from 'react';

import users from '@/users.json';
import { DebtList } from '@/presentation/pages';
import { makeRemoteLoadDebtList } from '@/main/factories/usecases/';

export const makeDebtList: React.FC = () => {
  return <DebtList loadDebtList={makeRemoteLoadDebtList()} users={users} />;
};
