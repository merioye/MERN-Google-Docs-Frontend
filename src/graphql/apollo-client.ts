import { HttpLink, InMemoryCache, ApolloClient } from '@apollo/client'

import { SERVER_APP_URL } from '../config/constants'

const httpLink = new HttpLink({
  uri: SERVER_APP_URL,
  credentials: 'include',
})

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        doc(_, { args, toReference }) {
          return toReference({
            __typename: 'Doc',
            id: args?.id,
          })
        },
      },
    },
  },
})

export const client = new ApolloClient({
  link: httpLink,
  cache: cache,
})
