import React from 'react';
import {
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from '@testing-library/react';

import Select from './select';
import Context from '@/presentation/contexts/form/form-context';

const mockedState = {
  state: '',
  setState: jest.fn(),
};

const options = [
  { value: 1, label: 'Usuário 1' },
  { value: 2, label: 'Usuário 2' },
  { value: 3, label: 'Usuário 3' },
];

const makeSut = (): RenderResult => {
  return render(
    <Context.Provider value={mockedState}>
      <Select options={options} />
    </Context.Provider>
  );
};

describe('Select Component', () => {
  test('Should be call setState on change event', async () => {
    const sut = makeSut();
    const container = sut.getByText('Selecione um cliente');
    fireEvent.keyDown(container, { keyCode: 40 });
    await waitFor(() => sut.getByText('Usuário 1'));
    fireEvent.click(sut.getByText('Usuário 1'));
    expect(mockedState.setState).toBeCalledTimes(1);
  });
});
