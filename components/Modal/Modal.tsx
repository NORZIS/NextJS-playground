import React, { FunctionComponent, useState } from 'react';
import classes from './Modal.module.css';

export const Modal: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open modal
      </button>

      {open && (
        <div className={classes['modal']}>
          <div className={classes['modal-body']}>
            <h1>Modal title</h1>
            <p>I am awesome modal!</p>
            <button
              onClick={() => {
                setOpen(false);
              }}
            >
              Close modal
            </button>
          </div>
        </div>
      )}
    </>
  );
};
