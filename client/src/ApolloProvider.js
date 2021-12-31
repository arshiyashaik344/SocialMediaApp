import React from 'react';
import App from './App';

import { ApolloProvider, InMemoryCache, createHttpLink, ApolloClient } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
  
  //Logic when we use offset and limit in useQuery hook
  // cache: new InMemoryCache({
  //   typePolicies: {
  //     Query: {
  //       fields:{
  //         posts: {
  //           keyArgs: ["postId"],
  //           merge: (existingPosts=[], incomingPosts) => {
  //             return [...existingPosts, ...incomingPosts];
  //           }
  //         }
  //       }
  //     }
  //   }
  // })
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
