import React, { useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Container,
  Box,
  Button,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Home as HomeIcon,
  SkipNext as SkipNextIcon,
  SkipPrevious as SkipPreviousIcon,
  Transgender as TransgenderIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  QuestionMark as QuestionMarkIcon,
  Favorite as FavoriteIcon,
  HeartBroken as HeartBrokenIcon,
} from '@mui/icons-material';

const CharacterDetails = ({ label, value }) => (
  <ListItem>
    <ListItemText primary={label} primaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)' }, }} secondary={value || "No Data"} secondaryTypographyProps={{ sx: { color: 'rgba(0, 40, 0, 0.8)' }, }} />
  </ListItem>
);

const EpisodeListItem = ({ label, value }) => (
  <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 0 }}>
    {value.map((item, index) => (
      <React.Fragment key={index}>
        <ListItemText primary={label[index]} primaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)' }, }} secondary={item || "No Data"} secondaryTypographyProps={{ sx: { color: 'rgba(0, 40, 0, 0.8)' }, }} sx={{ textAlign: 'center', flexBasis: `${100 / label.length}%`, }} />
          {index !== value.length - 1 && <Divider orientation="vertical" flexItem />}
      </React.Fragment>
    ))}
  </ListItem>
);

const CharacterStatusMark = ({ characterStatus }) => {
  const statusIcons = {
    Alive: <FavoriteIcon fontSize="large" />,
    Dead: <HeartBrokenIcon fontSize="large" />,
    default: <QuestionMarkIcon fontSize="large" />,
  };
  return statusIcons[characterStatus] || statusIcons.default;
};

const CharacterGenderMark = ({ characterGender }) => {
  const genderIcons = {
    Female: <FemaleIcon fontSize="large" />,
    Male: <MaleIcon fontSize="large" />,
    Genderless: <TransgenderIcon fontSize="large" />,
    default: <QuestionMarkIcon fontSize="large" />,
  };
  return genderIcons[characterGender] || genderIcons.default;
};

export default function MediaCard({ characterCount, dataCharacters }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openOrigin, setOpenOrigin] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openEpisode, setOpenEpisode] = useState(false);

  const character = dataCharacters.charactersByIds[id - 1] || {};
  const isEmptyData = !character || Object.keys(character).length === 0;

  const handleNavigation = (targetId) => {
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
            <CardMedia component="img" sx={{ height: '100%', width: '100%', objectFit: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center', }} image={isEmptyData ? '/no-data.jpg' : character.image} title={isEmptyData ? 'No Data' : character.name} />
          </Grid>
          <Grid item xs={7}>
            <CardHeader title={isEmptyData ? 'No Data' : character.name} titleTypographyProps={{ sx: { fontWeight: 'bold', textAlign: 'center', fontFamily: 'Get Schwifty, Roboto, Arial, sans-serif', color: 'rgba(0, 40, 0, 0.8)', } }} />
            <Container sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', paddingBottom: '0px' }} maxWidth="md">
              <Typography sx={{ ...iconStyle }}>
                <CharacterGenderMark characterGender={character.gender} />
              </Typography>
              <Typography sx={{ ...iconStyle }}>
                <CharacterStatusMark characterStatus={character.status} />
              </Typography>
            </Container>
            <CardContent>
              {isEmptyData ? (
                <Typography variant="body1" align="center">No Data</Typography>
              ) : (
                <List sx={{ width: '100%', minWidth: '30vw', minHeight: '40vh', borderRadius: 2, border: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper', overflow: 'auto', maxHeight: '52vh', }} aria-label="character details">
                  <CharacterDetails label="ID" value={character.id} />
                  <Divider component="li" />
                  <CharacterDetails label="Status" value={character.status} />
                  <Divider component="li" />
                  <CharacterDetails label="Species" value={character.species} />
                  <Divider component="li" />
                  <CharacterDetails label="Type" value={character.type || "Normal"} />
                  <Divider component="li" />
                  <CharacterDetails label="Gender" value={character.gender} />
                  <Divider component="li" />
                  <ListItem button onClick={() => setOpenOrigin(!openOrigin)}>
                    <ListItemText primary="Origin" primaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', } }} secondary={character.origin.name || "No Data"} secondaryTypographyProps={{ sx: { color: 'rgba(0, 40, 0, 0.8)', } }} />
                  </ListItem>
                  <Collapse in={openOrigin} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Type:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {character.origin.type || "No Data"}</span>
                      </Typography>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Dimension:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {character.origin.dimension || "No Data"}</span>
                      </Typography>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Number of Citizens:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {character.origin.residents.length || "No Data"}</span>
                      </Typography>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Created:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {character.origin.created || "No Data"}</span>
                      </Typography>
                    </CardContent>
                  </Collapse>
                  <Divider component="li" />
                  <ListItem button onClick={() => setOpenLocation(!openLocation)}>
                    <ListItemText primary="Location" primaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', } }} secondary={character.location.name || "No Data"} secondaryTypographyProps={{ sx: { color: 'rgba(0, 40, 0, 0.8)', } }} />
                  </ListItem>
                  <Collapse in={openLocation} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Type:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {character.location.type || " No Data"}</span>
                      </Typography>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Dimension:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {character.location.dimension || " No Data"}</span>
                      </Typography>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Number of Citizens:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {character.location.residents.length || " No Data"}</span>
                      </Typography>
                      <Typography variant="body2" component="h6">
                        <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', }}>Created:</span>
                        <span style={{ color: 'rgba(0, 40, 0, 0.8)', }}> {character.location.created || " No Data"}</span>
                      </Typography>
                    </CardContent>
                  </Collapse>
                  <Divider component="li" />
                  <ListItem button onClick={() => setOpenEpisode(!openEpisode)}>
                    <ListItemText primary="Episode Count" primaryTypographyProps={{ sx: { fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)', } }} secondary={character.episode.length} secondaryTypographyProps={{ sx: { color: 'rgba(0, 40, 0, 0.8)', } }} />
                  </ListItem>
                  <Collapse in={openEpisode} timeout="auto" unmountOnExit>
                    <List>
                      {character.episode.map((ep) => (
                        <EpisodeListItem key={ep.id} label={["Episode Name", "Episode Number", "Episode Air Date"]} value={[ep.name, ep.episode, ep.air_date]} />
                      ))}
                    </List>
                  </Collapse>
                  <Divider component="li" />
                  <CharacterDetails label="Created" value={character.created} />
                </List>
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', height: '10vh', margin: 'auto', overflow: 'auto', }}>
        {parseInt(id) > 1 && (
          <Button onClick={() => handleNavigation(1)} sx={{ ...buttonStyle }}>
            <SkipPreviousIcon fontSize="large" sx={{ color: 'white', }} />
          </Button>
        )}
        {parseInt(id) > 1 && (
          <Button onClick={() => handleNavigation(parseInt(id) - 1)} sx={{ ...buttonStyle }}>
            <ArrowBackIcon fontSize="large" sx={{ color: 'white', }} />
          </Button>
        )}
        <Button component={Link} to="/" color="inherit" sx={{ ...buttonStyle }}>
          <HomeIcon fontSize="large" sx={{ color: 'white', }} />
        </Button>
        {parseInt(id) < characterCount && (
          <Button onClick={() => handleNavigation(parseInt(id) + 1)} sx={{ ...buttonStyle }}>
          <ArrowForwardIcon fontSize="large" sx={{ color: 'white', }} />
        </Button>
      )}
      {parseInt(id) < characterCount && (
        <Button onClick={() => handleNavigation(characterCount)} sx={{ ...buttonStyle }}>
          <SkipNextIcon fontSize="large" sx={{ color: 'white', }} />
        </Button>
      )}
    </Container>
  </Box>
);
}


