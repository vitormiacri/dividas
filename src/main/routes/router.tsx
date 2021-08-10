import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { makeDebtList } from '../factories/pages/debt-list/debt-list-factory';
import { makeDebt } from '../factories/pages/debt/debt-factory';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={makeDebtList} />
        <Route path="/add-debt" exact component={makeDebt} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
