import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { makeDebtList } from '../factories/pages/debt-list/debt-list-factory';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={makeDebtList} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
