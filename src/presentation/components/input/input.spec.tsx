import React from 'react';
import faker from 'faker';
import { fireEvent, render, RenderResult } from '@testing-library/react';

import Input from './input';
import Context from '@/presentation/contexts/form/form-context';

const mockedState = {
  state: '',
  setState: jest.fn(),
};

const makeSut = (name = faker.database.column()): RenderResult => {
  return render(
    <Context.Provider value={mockedState}>
      <Input name={name} />
    </Context.Provider>
  );
};
describe('InputComponent', () => {
  test('Should call setState on change event', () => {
    const field = faker.database.column();
    const sut = makeSut(field);

    const text = faker.internet.userName();
    const input = sut.getByTestId(field);

    fireEvent.change(input, { target: { value: text } });
    expect(mockedState.setState).toBeCalledTimes(1);
  });
});
