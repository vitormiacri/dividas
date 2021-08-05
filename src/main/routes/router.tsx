import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { DebtList } from '@/presentation/pages';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={DebtList} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
