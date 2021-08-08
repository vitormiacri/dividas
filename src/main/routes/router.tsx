import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Debt from '@/presentation/pages/debt/debt';
import { makeDebtList } from '../factories/pages/debt-list/debt-list-factory';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={makeDebtList} />
        <Route path="/add-debt" exact component={Debt} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
