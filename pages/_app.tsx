import type { AppProps } from 'next/app';
import { TodoContext } from '../components/context';

const App = <T,>(props: AppProps<T>): JSX.Element => {
  const { Component, pageProps } = props;
  return (
    <TodoContext.Provider value={{}}>
      <Component {...pageProps} />
    </TodoContext.Provider>
  );
};

export default App;
