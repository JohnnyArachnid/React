import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box } from "@mui/material";
import DataLoader from './components/Data/DataLoader.tsx';
import TopBar from './components/Bars/TopBar/TopBar.tsx';
import BottomBar from './components/Bars/BottomBar/BottomBar.tsx';
import FinalTable from './components/Table/Table.tsx';
import MediaCard from './components/Card/Card.tsx';
import ErrorPage from './ErrorPage.tsx';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: from([errorLink, new HttpLink({ uri: 'https://rickandmortyapi.com/graphql' })]),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh', backgroundImage: `url("/backgroundMain.png")`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', }}>
          <TopBar />
          <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100vh', paddingY: 2, overflow: 'auto', margin: 'auto', }}>
              <Routes>
                <Route path="/" element={<FinalTable />} />
                <Route path="/character/:id" element={
                  <DataLoader>
                    <MediaCard />
                  </DataLoader>
                } />
                <Route path="/404" element={<ErrorPage message="Page not found" />} />
                <Route path="/500" element={<ErrorPage message="Something went wrong" />} />
                <Route path="*" element={<ErrorPage message="Page not found" />} />
              </Routes>
          </Container>
          <BottomBar />
        </Box>
      </Router>
    </ApolloProvider>
  );
}
