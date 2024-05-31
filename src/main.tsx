import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/css/style.scss';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import store from './config/redux.config.ts';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
);
