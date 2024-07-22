import { FC } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box, } from "@mui/material";
import TopBar from './components/Bars/TopBar/TopBar';
import BottomBar from './components/Bars/BottomBar/BottomBar';
import FinalTable from './components/Table/FinalTable';
import MediaCard from './components/Card/MediaCard';
import ErrorPage from './components/ErrorPage/ErrorPage';
import backgroundImage from '../public/backgroundMain.png'

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

const App: FC = (): JSX.Element => {
  return (
    <ApolloProvider client={client}>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', }}>
            <TopBar />
            <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '100vh', paddingY: 2, overflow: 'auto', margin: 'auto', }}>
              <Routes>
                <Route path="/" element={<FinalTable />} />
                <Route path="/character/:id" element={<MediaCard />} />
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

export default App;
