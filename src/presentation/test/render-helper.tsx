import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MemoryHistory } from 'history';
import { Router } from 'react-router-dom';

type Params = {
  Page: React.FC;
  history: MemoryHistory;
};

type Result = {
  sut: RenderResult;
};

export const renderWithHistory = ({ Page, history }: Params): Result => {
  const sut = render(
    <Router history={history}>
      <Page />
    </Router>
  );
  return {
    sut,
  };
};
