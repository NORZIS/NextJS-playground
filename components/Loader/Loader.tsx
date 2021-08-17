import React, { FunctionComponent } from 'react';
import classes from './Loader.module.css';

export const Loader: FunctionComponent = () => (
  <div style={{ display: 'flex', justifyContent: 'center', margin: '.5rem' }}>
    <div className={classes['lds-hourglass']} />
  </div>
);
