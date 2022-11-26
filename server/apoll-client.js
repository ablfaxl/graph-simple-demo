import React, { useMemo, useRef } from 'react'

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink
} from '@apollo/client';

import { onError } from "@apollo/client/link/error";

import { setContext } from '@apollo/client/link/context';

const graphqlEndpoint = 'ur graphql endpoint' 

// The name here doesn't really matter.
export default function CustomApolloProvider(props) {

  // const tokenRef = useRef();

  // Whenever the token changes, the component re-renders, thus updating the ref.
  // tokenRef.current = token;

  // Ensure that the client is only created once.
  const client = useMemo(() => {

    const authLink = setContext((_, { headers }) => ({
      headers: {
        ...headers,
        // auth: tokenRef.current ? `ut ${tokenRef.current}` : null,
      }
    }));

    const errorLink = onError(({ graphQLErrors, networkError, operation }) => {

      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, location, path }) => {

          // if (message === 'unathorized') {
          //   // delete cookie and navigae to wikipedia
          // }
          console.log(`message:${message} location:${location}`)
        })
      }
    
      if (networkError) {
        console.log(`networkerror: ${networkError}`)
      }
    })

    const httpLink = createHttpLink({
      uri: graphqlEndpoint,
    });

    const link = ApolloLink.from([errorLink, authLink, httpLink])
    // const wtfLink = ApolloLink.from([authLink, wsLink])
    
    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }, [])

  return <ApolloProvider client={client} {...props} />;
}