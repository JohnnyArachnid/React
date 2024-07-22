import { FC } from "react";
import { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardHeader, Typography, Divider, Grid, List, ListItem, ListItemText, Collapse, Container, Box, Button } from '@mui/material';
import { ArrowBack, ArrowForward, Home, SkipNext, SkipPrevious } from '@mui/icons-material';
import { GET_CHARACTERS_COUNT, GET_CHARACTERS, Character, QueryDataCount, QueryData } from './MediaCardQuery';
import { CharacterDetails, EpisodeListItem, CharacterStatusMark, CharacterGenderMark, ParseId } from './MediaCardFunctions';
import Portal from '../Portal/Portal';

const MediaCard: FC = (): JSX.Element => {
  const [count, setCount] = useState<number | null>(null);
  const [characterData, setCharacterData] = useState<Character | null>(null);
  const [openOrigin, setOpenOrigin] = useState<boolean>(false);
  const [openLocation, setOpenLocation] = useState<boolean>(false);
  const [openEpisode, setOpenEpisode] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { loading: loadingCount, error: errorCount, data: dataCount } = useQuery<QueryDataCount>(GET_CHARACTERS_COUNT, {
    fetchPolicy: "network-only",
  });

  const { loading: loadingCharacter, error: errorCharacter, data: dataCharacter } = useQuery<QueryData>(GET_CHARACTERS, {
    variables: { id },
    fetchPolicy: "network-only",
  });

  useEffect(() : void => {
    if (dataCount && dataCount.characters && dataCount.characters.info) {
      setCount(dataCount.characters.info.count);
    }
  }, [dataCount]);

  useEffect(() : void => {
    if (dataCharacter && dataCharacter.character) {
      setCharacterData(dataCharacter.character);
    }
  }, [dataCharacter]);

  useEffect(() : void => {
    if (!loadingCount && !loadingCharacter && count !== null) {
      const currentId = ParseId(id);
      if (currentId < 1 || currentId > count) {
        navigate('/404', { state: { message: 'Character not found' } });
      }
    }
  }, [loadingCount, loadingCharacter, count, id, navigate]);

  useEffect(() : void => {
    const error = errorCount || errorCharacter;
    if (error) {
      if (error.networkError) {
        navigate('/500', { state: { message: `Error fetching data: ${error.message}` } });
      } else if (error.graphQLErrors && error.graphQLErrors.some((e: any): boolean => e.extensions?.code === '404')) {
        navigate('/404', { state: { message: `Error fetching data: ${error.message}` } });
      } else {
        navigate('*', { state: { message: `Error fetching data: ${error.message}` } });
      }
    }
  }, [errorCount, errorCharacter, navigate]);

  if (loadingCount || loadingCharacter) {
    return (
      <Box className='Container'>
        <Portal displayData={'Loading ...'} isError={false} />
      </Box>
    );
  }

  if (!characterData || count === null) {
    return (
      <Box className='Container'>
        <Portal displayData={'No Data'} isError={true} />
      </Box>
    );
  }

  const isEmptyData: boolean = !characterData;

  const handleNavigation = (targetId: number): void => {
    navigate(`/character/${targetId}`);
  };

  const iconStyle = {
    color: 'white',
    backgroundColor: 'rgba(0, 40, 0, 1)',
    fontWeight: 'bold',
    alignItems: 'center',
    paddingX: 2,
    paddingTop: '7px',
    border: '5px solid black',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  }

  const buttonStyle = {
    backgroundColor: 'rgba(0, 40, 0, 0.8)',
    '&:hover': { backgroundColor: 'rgba(0, 40, 0, 0.9)' },
    '&:active': { backgroundColor: 'rgba(0, 40, 0, 1)' },
  }

  return (
    <Box sx={{ margin: 'auto', overflow: 'auto' }}>
      <Card sx={{ minWidth: '60vw', maxWidth: '90vw', maxHeight: '90vh', minHeight: '50vh', border: '5px solid black', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', margin: 'auto', overflow: 'auto', }} raised={true}>
        <Grid container>
          <Grid item xs={5}>
            <CardMedia component="img" sx={{ height: '100%', width: '100%', objectFit: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', }} image={isEmptyData ? '/no-data.jpg' : characterData.image} title={isEmptyData ? 'No Data' : characterData.name} />
          </Grid>
          <Grid item xs={7}>
            <CardHeader title={isEmptyData ? 'No Data' : characterData.name} titleTypographyProps={{ sx: { fontWeight: 'bold', textAlign: 'center', fontFamily: 'Get Schwifty, Roboto, Arial, sans-serif', color: 'rgba(0, 40, 0, 0.8)', } }} />
            <Container sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', paddingBottom: '0px' }} maxWidth="md">
              <Typography sx={{ ...iconStyle }}>
                <CharacterGenderMark characterGender={characterData.gender} />
              </Typography>
              <Typography sx={{ ...iconStyle }}>
                <CharacterStatusMark characterStatus={characterData.status} />
              </Typography>
            </Container>
            <CardContent>
              {isEmptyData ? (
                <Typography variant="body1" align="center">No Data</Typography>
              ) : (
                <List sx={{ width: '100%', minWidth: '30vw', minHeight: '40vh', borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper', overflow: 'auto', maxHeight: '52vh', }} aria-label="character details">
                  <CharacterDetails label="ID" value={characterData.id} />
                  <Divider component="li" />
                  <CharacterDetails label="Status" value={characterData.status} />
                  <Divider component="li" />
                  <CharacterDetails label="Species" value={characterData.species} />
                  <Divider component="li" />
                  <CharacterDetails label="Type" value={characterData.type || "Normal"} />
                  <Divider component="li" />
                  <CharacterDetails label="Gender" value={characterData.gender} />
                  <Divider component="li" />
                  <ListItem button onClick={() => setOpenOrigin(!openOrigin)}>
                    <ListItemText primary="Origin" primaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', } }} secondary={characterData.origin.name || "No Data"} secondaryTypographyProps={{ sx: { color: 'rgba(0, 40, 0, 0.8)', } }} />
                  </ListItem>
                  <Collapse in={openOrigin} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Type:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {characterData.origin.type || "No Data"}</span>
                      </Typography>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Dimension:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {characterData.origin.dimension || "No Data"}</span>
                      </Typography>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Number of Citizens:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {characterData.origin.residents.length || "No Data"}</span>
                      </Typography>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Created:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {characterData.origin.created || "No Data"}</span>
                      </Typography>
                    </CardContent>
                  </Collapse>
                  <Divider component="li" />
                  <ListItem button onClick={() => setOpenLocation(!openLocation)}>
                    <ListItemText primary="Location" primaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', } }} secondary={characterData.location.name || "No Data"} secondaryTypographyProps={{ sx: { color: 'rgba(0, 40, 0, 0.8)', } }} />
                  </ListItem>
                  <Collapse in={openLocation} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Type:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {characterData.location.type || " No Data"}</span>
                      </Typography>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Dimension:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {characterData.location.dimension || " No Data"}</span>
                      </Typography>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Number of Citizens:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {characterData.location.residents.length || " No Data"}</span>
                      </Typography>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Created:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {characterData.location.created || " No Data"}</span>
                      </Typography>
                    </CardContent>
                  </Collapse>
                  <Divider component="li" />
                  <ListItem button onClick={() => setOpenEpisode(!openEpisode)}>
                    <ListItemText primary="Episode Count" primaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', } }} secondary={characterData.episode.length} secondaryTypographyProps={{ sx: { color: 'rgba(0, 40, 0, 0.8)', } }} />
                  </ListItem>
                  <Collapse in={openEpisode} timeout="auto" unmountOnExit>
                    <List>
                      {characterData.episode.map((ep) => (
                        <EpisodeListItem key={ep.id} label={["Episode Name", "Episode Number", "Episode Air Date"]} value={[ep.name, ep.episode, ep.air_date]} />
                      ))}
                    </List>
                  </Collapse>
                  <Divider component="li" />
                  <CharacterDetails label="Created" value={characterData.created} />
                </List>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', height: '10vh', margin: 'auto', overflow: 'auto', }}>
        {ParseId(id) > 1 && (
          <Button onClick={() => handleNavigation(1)} sx={{ ...buttonStyle }}>
            <SkipPrevious fontSize="large" sx={{ color: 'white', }} />
          </Button>
        )}
        {ParseId(id) > 1 && (
          <Button onClick={() => handleNavigation(ParseId(id) - 1)} sx={{ ...buttonStyle }}>
            <ArrowBack fontSize="large" sx={{ color: 'white', }} />
          </Button>
        )}
        <Button component={Link} to="/" color="inherit" sx={{ ...buttonStyle }}>
          <Home fontSize="large" sx={{ color: 'white', }} />
        </Button>
        {ParseId(id) < count && (
          <Button onClick={() => handleNavigation(ParseId(id) + 1)} sx={{ ...buttonStyle }}>
          <ArrowForward fontSize="large" sx={{ color: 'white', }} />
        </Button>
      )}
      {ParseId(id) < count && (
        <Button onClick={() => handleNavigation(count)} sx={{ ...buttonStyle }}>
          <SkipNext fontSize="large" sx={{ color: 'white', }} />
        </Button>
      )}
    </Container>
  </Box>
);
}

export default MediaCard;
