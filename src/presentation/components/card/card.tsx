import React from 'react';

import Styles from './card-styles.scss';

const Card: React.FC = ({ children }) => {
  return <div className={Styles.card}>{children}</div>;
};

export default Card;
