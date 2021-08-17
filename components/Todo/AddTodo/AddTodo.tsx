import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import PropTypes from 'prop-types';

export interface useInputValueResult {
  clear: () => void;
  value: () => string;
  bind: {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
}

const useInputValue = (defaultValue: string): useInputValueResult => {
  const [value, setValue] = useState(defaultValue);

  return {
    bind: {
      value,
      onChange: (event) => setValue(event.target.value),
    },
    clear: () => setValue(''),
    value: () => value,
  };
};

export interface AddTodoProps {
  onCreate: (value: string) => void;
}

export const AddTodo: FunctionComponent<AddTodoProps> = ({
  onCreate,
}: AddTodoProps) => {
  const input = useInputValue('');

  function submitHandler(event) {
    event.preventDefault();

    if (input.value().trim()) {
      onCreate(input.value());
      input.clear();
      // setValue('')
    }
  }
  return (
    <form style={{ marginBottom: '1rem' }} onSubmit={submitHandler}>
      <input {...input.bind} />
      <button type="submit">Add todo</button>
    </form>
  );
};

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
