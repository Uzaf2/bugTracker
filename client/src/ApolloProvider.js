import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from 'apollo-link-context';


const httpLink = createHttpLink({
    //uri:'https://glacial-brook-94591.herokuapp.com/'
    uri:'http://localhost:5000/'
})

const authLink = setContext(()=>{
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}`: ''
        }
    }
})

/*
const authLink = setContext(()=>{
    const token = localStorage.getItem('jwtToken');

})
*/

const client = new ApolloClient({
   link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})


export default (
    <ApolloProvider client={client}>
   <App/> 
    </ApolloProvider>
)