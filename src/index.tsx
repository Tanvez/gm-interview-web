import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache
} from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri:process.env.REACT_APP_API_BASE_URL
});

ReactDOM.render(
  
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  document.getElementById('root')
);
