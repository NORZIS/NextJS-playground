import Head from 'next/head';
import type { TodoItemType } from '../data-models';
import { useEffect, useCallback, useState } from 'react';
import { TodoList, Loader, Modal, AddTodo } from '../components/';

export const Home = (): JSX.Element => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((response) => response.json())
      .then((todos) => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 2000);
      });
  }, []);

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  }
  const removeTodo = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [setTodos, todos]
  );

  function addTodo(title) {
    setTodos(
      todos.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ])
    );
  }

  return (
    <div className="container">
      <Head>
        <title>New shit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="wrapper">
        <h1>Hello, world!!!</h1>
        <Modal />

        <AddTodo onCreate={addTodo} />

        {loading && <Loader />}
        {todos.length ? (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            removeTodo={removeTodo}
          />
        ) : loading ? null : (
          <p>No todos!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
