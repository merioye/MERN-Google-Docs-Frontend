import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { Toaster } from 'react-hot-toast'

import { client } from './graphql/apollo-client'
import SearchInputContextProvider from './context/SearchInputContext'
import App from './App'
import './index.scss'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ApolloProvider client={client}>
    <SearchInputContextProvider>
      <App />
      <Toaster />
    </SearchInputContextProvider>
  </ApolloProvider>,
)
