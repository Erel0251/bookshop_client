import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/css/style.scss';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store.ts';
import { ThemeProvider } from '@emotion/react';
import theme from './config/theme.ts';
import { CssBaseline } from '@mui/material';
import { PersistGate } from 'redux-persist/integration/react';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
