import { FunctionComponent } from 'react';
import type { TodoItemType } from '../../../data-models';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './TodoItem.module.css';

export interface TodoItemProps {
  todo: TodoItemType;
  index: number;
  onChange: (id: number) => void;
  removeTodo: (id: number) => void;
}

export const TodoItem: FunctionComponent<TodoItemProps> = ({
  todo,
  index,
  onChange,
  removeTodo,
}: TodoItemProps) => {
  return (
    <li className={classes['todo-item']}>
      <span
        className={classNames({
          [classes['todo-item__done']]: todo.completed,
        })}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          className={classes['todo-item__input']}
          onChange={() => onChange(todo.id)}
        />
        <strong>{index + 1}</strong>
        &nbsp;
        {todo.title}
      </span>

      <button className="rm" onClick={removeTodo.bind(null, todo.id)}>
        &times;
      </button>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.exact({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool,
    title: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};
