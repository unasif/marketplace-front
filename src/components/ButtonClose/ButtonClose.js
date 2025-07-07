
import React from 'react';
import styles from './ButtonClose.module.scss';

export const ButtonClose = ({ children, onClickProp }) => (
  <div className={styles.button} onClick={onClickProp}>
    {children}
  </div>
);