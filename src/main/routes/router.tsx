import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { makeDebt, makeDebtList, makeEditDebt } from '../factories/pages';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={makeDebtList} />
        <Route path="/add-debt" exact component={makeDebt} />
        <Route path="/edit-debt/:id" exact component={makeEditDebt} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
