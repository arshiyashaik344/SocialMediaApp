import { ApolloClient, from, InMemoryCache, useMutation, useQuery } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "./graphql";
import { RetryLink } from '@apollo/client/link/retry';
import { HttpLink  } from "@apollo/client";

const { loading, data } = useQuery(FETCH_POSTS_QUERY,{
    fetchPolicy:'cache-and-network', //It checks for data in cache and still does the network requests to update the cache
    errorPolicy:'all'
});

//index.js

const httpLink = new HttpLink({
    uri:'https://localhost:5000'
});

//RetryLink gives up after 5 tries and sends error to the component
const retryLink = new RetryLink({
    delay : {
        initial: 2000,
        max: 2000,
        jitter: false
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link:from([retryLink, httpLink])
});

//while using useMutation hook, some updations can be done which in return expects updated data to be on UI
//for this, we can make use of refetchQueries which refetches the required query
//but it everytime makes a network call rather updating the cache

// useQuery can have offset and limit params with fetchmore options