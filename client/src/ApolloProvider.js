import React from 'react';
import App from './App';
import  ApolloClient from 'apollo-client';
import { InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';


const httpLink = createHttpLink({
    uri:'http://localhost:5000'
})

/*
const authLink = setContext(()=>{
    const token = localStorage.getItem('jwtToken');

})
*/

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})


export default (
    <ApolloProvider client={client}>
   <App/> 
    </ApolloProvider>
)