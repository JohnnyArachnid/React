import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import FinalTable from './components/Table/Table.jsx'

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <FinalTable />
      </ApolloProvider>
    </>
  )
}

export default App
