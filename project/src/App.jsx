import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box } from "@mui/material";
import TopBar from './components/TopBar/TopBar.jsx';
import FinalTable from './components/Table/Table.jsx';
import BottomBar from './components/BottomBar/BottomBar.jsx';
import MediaCard from './components/Card/Card.jsx';
import DataLoader from './components/Data/DataLoader.jsx';
import './App.css';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh',
          backgroundImage: `url("/backgroundMain.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
          <TopBar />
          <Container maxWidth="xl" sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            paddingY: 2,
            overflow: 'auto',
            margin: 'auto',
          }}>
            <Routes>
              <Route
                path="/"
                element={
                <DataLoader>
                  <FinalTable />
                </DataLoader>
                }
              />
              <Route
                path="/character/:id"
                element={
                  <DataLoader>
                    <MediaCard />
                  </DataLoader>
                }
              />
            </Routes>
          </Container>
          <BottomBar />
        </Box>
      </Router>
    </ApolloProvider>
  );
}
