import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Container, Box } from "@mui/material";
import TopBar from './components/TopBar/TopBar.jsx';
import FinalTable from './components/Table/Table.jsx'
import BottomBar from './components/BottomBar/BottomBar.jsx';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
    }}>
      <TopBar />
        <Container maxWidth="xl">
          <ApolloProvider client={client}>
            <FinalTable />
          </ApolloProvider>
        </Container>
      <BottomBar />
    </Box>
  )
}
