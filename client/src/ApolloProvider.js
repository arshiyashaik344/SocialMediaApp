import React from 'react';
import App from './App';

import { ApolloProvider, InMemoryCache, createHttpLink, ApolloClient, split } from '@apollo/client';
import { setContext } from 'apollo-link-context';
// import { WebSocketLink } from '@apollo/client/link/ws';
// import { getMainDefinition } from '@apollo/client/utilities';

// *** can be used wrt suscriptions *** 
// const webSocketLink = new WebSocketLink({
//   uri: 'ws://localhost:5000'
// });
// const protocolLink = split (
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return definition.operation === 'subscription';
//   },
//   webSocketLink,
//   httpLink
// );

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
  
  //Logic when we use offset and limit in useQuery hook inorder to have Loadmore option
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
