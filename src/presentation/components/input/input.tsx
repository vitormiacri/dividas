import React, { useCallback, useContext } from 'react';

import Context from '@/presentation/contexts/form/form-context';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = ({ name, ...rest }) => {
  const { state, setState } = useContext(Context);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [event.target.name]: event.target.value,
      });
    },
    [setState, state]
  );

  return (
    <div className={Styles.inputWrap}>
      <input
        type="text"
        name={name}
        data-testid={name}
        onChange={handleChange}
        {...rest}
      />
    </div>
  );
};

export default Input;
