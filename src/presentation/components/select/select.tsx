import React, { useContext } from 'react';
import Select from 'react-select';

import Context from '@/presentation/contexts/form/form-context';
import Styles from './select-styles.scss';

type Props = {
  options: any[];
  defaultValue?: any;
};

const SelectInput: React.FC<Props> = ({ options, defaultValue, ...rest }) => {
  const { state, setState } = useContext(Context);

  return (
    <div className={Styles.inputWrap}>
      <Select
        onChange={({ value }) => setState({ ...state, idUsuario: value })}
        options={options}
        placeholder="Selecione um cliente"
        value={defaultValue}
        styles={{
          control: (styles) => ({ ...styles, maxHeight: 42 }),
          container: (styles) => ({ ...styles, maxHeight: 42 }),
          indicatorsContainer: (styles) => ({
            ...styles,
            maxHeight: 42,
          }),
          valueContainer: (styles) => ({ ...styles, maxHeight: 42 }),
          singleValue: (styles) => ({
            ...styles,
            top: '56%',
          }),
        }}
        {...rest}
      />
    </div>
  );
};

export default SelectInput;
