import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

import classes from './TodoList.module.css';
import { TodoItemType } from '../../../data-models';

export interface TodoListProps {
  todos: TodoItemType[];
  onToggle: (id: number) => void;
  removeTodo: (id: number) => void;
}

export const TodoList: FunctionComponent<TodoListProps> = ({
  todos,
  onToggle,
  removeTodo,
}: TodoListProps) => {
  return (
    <ul className={classes['ul']}>
      {todos.map((todo, index) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            index={index}
            onChange={onToggle}
            removeTodo={removeTodo}
          />
        );
      })}
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoItem.propTypes.todo).isRequired,
  onToggle: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
};
