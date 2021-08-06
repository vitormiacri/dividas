import Styles from './empty-styles.scss';
import React from 'react';

const Empty: React.FC = () => {
  return (
    <div className={Styles.empty} data-testid="empty">
      <p>Não foram encontradas dívidas</p>
    </div>
  );
};

export default Empty;
