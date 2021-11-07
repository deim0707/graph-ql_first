import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

import App from './App';

const PORT = 5001; // круто было бы иметь номер порта в одной переменной на бек и клиент. енв-переменная?
const client = new ApolloClient({
    uri: `http://localhost:${PORT}/graphql`,
    cache: new InMemoryCache(),
})

ReactDOM.render(
    // оборачиваем входной компоненте в АполлоПровайдер
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>,
    document.getElementById('root')
);