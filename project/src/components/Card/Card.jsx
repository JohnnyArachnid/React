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
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HomeIcon from '@mui/icons-material/Home';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

import './Card.css';

const CharacterDetails = ({ character, openOrigin, setOpenOrigin, openLocation, setOpenLocation, openEpisode, setOpenEpisode }) => {
  return (
    <List sx={{
        width: '100%',
        minWidth: '30vw',
        minHeight: '40vh',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        overflow: 'auto',
        maxHeight: '52vh',
      }} aria-label="character details">
      <ListItem>
        <ListItemText primary="ID" primaryTypographyProps={{
      sx: {
        fontWeight: 'bold',
        color: 'rgba(0, 40, 0, 1)',
      },
    }} secondary={character.id || "No Data"} secondaryTypographyProps={{
      sx: {
        color: 'rgba(0, 40, 0, 0.8)',
      },
    }} />
      </ListItem>
      <Divider component="li"/>
      <ListItem>
        <ListItemText primary="Status" primaryTypographyProps={{
      sx: {
        fontWeight: 'bold',
        color: 'rgba(0, 40, 0, 1)',
      },
     }} secondary={character.status || "No Data"} secondaryTypographyProps={{
      sx: {
        color: 'rgba(0, 40, 0, 0.8)',
      },
    }} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Species" primaryTypographyProps={{
      sx: {
        fontWeight: 'bold',
        color: 'rgba(0, 40, 0, 1)',
      },
    }} secondary={character.species || "No Data"} secondaryTypographyProps={{
      sx: {
        color: 'rgba(0, 40, 0, 0.8)',
      },
    }}/>
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Type" primaryTypographyProps={{
      sx: {
        fontWeight: 'bold',
        color: 'rgba(0, 40, 0, 1)',
      },
    }} secondary={character.type || "Normal"} secondaryTypographyProps={{
      sx: {
        color: 'rgba(0, 40, 0, 0.8)',
      },
    }}/>
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Gender" primaryTypographyProps={{
      sx: {
        fontWeight: 'bold',
        color: 'rgba(0, 40, 0, 1)',
      },
    }} secondary={character.gender || "No Data"} secondaryTypographyProps={{
      sx: {
        color: 'rgba(0, 40, 0, 0.8)',
      },
    }}/>
      </ListItem>
      <Divider component="li" />
      <ListItem button onClick={() => setOpenOrigin(!openOrigin)}>
        <ListItemText primary="Origin" primaryTypographyProps={{
      sx: {
        fontWeight: 'bold',
        color: 'rgba(0, 40, 0, 1)',
      },
    }} secondary={character.origin.name || "No Data"} secondaryTypographyProps={{
      sx: {
        color: 'rgba(0, 40, 0, 0.8)',
      },
    }}/>
      </ListItem>
      <Collapse in={openOrigin} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography variant="body2" component="h6">
          <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)' }}>
            Type:
          </span> 
          <span style={{ color: 'rgba(0, 40, 0, 0.8)' }}>
            {' ' + (character.origin.type || "No Data")}
          </span>
        </Typography>
        <Typography variant="body2" component="h6">
          <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)' }}>
            Dimension:
          </span> 
          <span style={{ color: 'rgba(0, 40, 0, 0.8)' }}>
            {' ' + (character.origin.dimension || "No Data")}
          </span>
        </Typography>
        <Typography variant="body2" component="h6">
          <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)' }}>
            Number of Citizens:
          </span> 
          <span style={{ color: 'rgba(0, 40, 0, 0.8)' }}>
            {' ' + character.origin.residents.length || "No Data"}
          </span>
        </Typography>
        <Typography variant="body2" component="h6">
          <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)' }}>
            Created:
          </span> 
          <span style={{ color: 'rgba(0, 40, 0, 0.8)' }}>
            {' ' + (character.origin.created || "No Data")}
          </span>
        </Typography>
        </CardContent>
      </Collapse>
      <Divider component="li" />
      <ListItem button onClick={() => setOpenLocation(!openLocation)}>
        <ListItemText primary="Location" primaryTypographyProps={{
      sx: {
        fontWeight: 'bold',
        color: 'rgba(0, 40, 0, 1)',
      },
    }} secondary={character.location.name || "No Data"} secondaryTypographyProps={{
      sx: {
        color: 'rgba(0, 40, 0, 0.8)',
      },
    }}/>
      </ListItem>
      <Collapse in={openLocation} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography variant="body2" component="h6">
          <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)' }}>
            Type:
          </span> 
          <span style={{ color: 'rgba(0, 40, 0, 0.8)' }}>
            {' ' + character.location.type || " No Data"}
          </span>
        </Typography>
        <Typography variant="body2" component="h6">
          <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)' }}>
            Dimension:
          </span> 
          <span style={{ color: 'rgba(0, 40, 0, 0.8)' }}>
            {' ' + character.location.dimension || " No Data"}
          </span>
        </Typography>
        <Typography variant="body2" component="h6">
          <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)' }}>
            Number of Citizens:
          </span> 
          <span style={{ color: 'rgba(0, 40, 0, 0.8)' }}>
            {' ' + character.location.residents.length || " No Data"}
          </span>
        </Typography>
        <Typography variant="body2" component="h6">
          <span style={{ fontWeight: 'bold', color: 'rgba(0, 40, 0, 1)' }}>
            Created:
          </span> 
          <span style={{ color: 'rgba(0, 40, 0, 0.8)' }}>
            {' ' + character.location.created || " No Data"}
          </span>
        </Typography>
        </CardContent>
      </Collapse>
      <Divider component="li" />
      <ListItem button onClick={() => setOpenEpisode(!openEpisode)}>
        <ListItemText primary="Episode Count" primaryTypographyProps={{
      sx: {
        fontWeight: 'bold',
        color: 'rgba(0, 40, 0, 1)',
      },
    }} secondary={character.episode.length} secondaryTypographyProps={{
      sx: {
        color: 'rgba(0, 40, 0, 0.8)',
      },
    }}/>
      </ListItem>
      <Collapse in={openEpisode} timeout="auto" unmountOnExit>
      <List>
        {character.episode.map((ep, index) => (
          <React.Fragment key={ep.id}>
            <ListItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 0 }}>
              <ListItemText primary="Episode Name" primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  color: 'rgba(0, 40, 0, 1)',
                },
              }} secondary={ep.name || "No Data"} secondaryTypographyProps={{
                sx: {
                  color: 'rgba(0, 40, 0, 0.8)',
                },
              }} sx={{ textAlign: 'center', flexBasis: '33%' }} />
              <Divider orientation="vertical" flexItem />
              <ListItemText primary="Episode Number" primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  color: 'rgba(0, 40, 0, 1)',
                },
              }} secondary={ep.episode || "No Data"} secondaryTypographyProps={{
                sx: {
                  color: 'rgba(0, 40, 0, 0.8)',
                },
              }} sx={{ textAlign: 'center', flexBasis: '33%' }} />
              <Divider orientation="vertical" flexItem />
              <ListItemText primary="Episode Air Date" primaryTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  color: 'rgba(0, 40, 0, 1)',
                },
              }} secondary={ep.air_date || "No Data"} secondaryTypographyProps={{
                sx: {
                  color: 'rgba(0, 40, 0, 0.8)',
                },
              }} sx={{ textAlign: 'center', flexBasis: '33%' }} />
            </ListItem>
            {index !== character.episode.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      </Collapse>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Created" primaryTypographyProps={{
      sx: {
        fontWeight: 'bold',
        color: 'rgba(0, 40, 0, 1)',
      },
    }} secondary={character.created || "No Data"} secondaryTypographyProps={{
      sx: {
        color: 'rgba(0, 40, 0, 0.8)',
      },
    }}/>
      </ListItem>
    </List>
  );
};

const statusIcons = {
  Alive: <FavoriteIcon fontSize="large" />,
  Dead: <HeartBrokenIcon fontSize="large" />,
  default: <QuestionMarkIcon fontSize="large" />,
};

const CharacterStatusMark = ({ characterStatus }) => {
  return statusIcons[characterStatus] || statusIcons.default;
};

const genderIcons = {
  Female: <FemaleIcon fontSize="large" />,
  Male: <MaleIcon fontSize="large" />,
  Genderless: <TransgenderIcon fontSize="large" />,
  default: <QuestionMarkIcon fontSize="large" />,
};

const CharacterGenderMark = ({ characterGender }) => {
  return genderIcons[characterGender] || genderIcons.default;
};


export default function MediaCard({ characterCount, dataCharacters }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [openOrigin, setOpenOrigin] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [openEpisode, setOpenEpisode] = useState(false);

  const character = dataCharacters.charactersByIds[id - 1];

  const isEmptyData = !character || Object.keys(character).length === 0;

  const handlePrev = () => {
    const prevId = parseInt(id) - 1;
    if (prevId >= 1) {
      navigate(`/character/${prevId}`);
    }
  };

  const handleNext = () => {
    const nextId = parseInt(id) + 1;
    if (nextId <= characterCount) {
      navigate(`/character/${nextId}`);
    }
  };

  const handleFirst = () => {
    navigate(`/character/1`);
  };

  const handleLast = () => {
    navigate(`/character/${characterCount}`);
  };

  return (
    <Box sx={{ margin: 'auto',
      overflow: 'auto',
    }}>
      <Card sx={{ minWidth: '60vw',
        maxWidth: '90vw', 
        maxHeight: '90vh', 
        minHeight: '50vh', 
        border: '5px solid black',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        margin: 'auto',
        overflow: 'auto',}} raised={true}>
        <Grid container>
          <Grid item xs={5}>
            <CardMedia
              component="img"
              sx={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              image={isEmptyData ? '/no-data.jpg' : character.image}
              title={isEmptyData ? 'No Data' : character.name}
            />
          </Grid>
          <Grid item xs={7}>
            <CardHeader
              title={isEmptyData ? 'No Data' : character.name}
              titleTypographyProps={{
                sx: {
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontFamily: 'Get Schwifty, Roboto, Arial, sans-serif',
                  color: 'rgba(0, 40, 0, 0.8)',
                }
              }} />
              <Container sx={{ 
                display: 'flex', 
                justifyContent: 'space-evenly', 
                alignItems: 'center', 
                paddingBottom: '0px',
              }} 
              maxWidth="md">
                  <Typography sx={{color: 'white',
                    backgroundColor: 'rgba(0, 40, 0, 1)', 
                    fontWeight: 'bold', 
                    alignItems: 'center',
                    paddingX: 2, 
                    paddingTop: '7px', 
                    border: '5px solid black',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',}}><CharacterGenderMark characterGender={character.gender}/></Typography>
                  <Typography sx={{color: 'white',
                    backgroundColor: 'rgba(0, 40, 0, 1)', 
                    fontWeight: 'bold', 
                    alignItems: 'center',
                    paddingX: 2, 
                    paddingTop: '7px', 
                    border: '5px solid black',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',}}><CharacterStatusMark characterStatus={character.status}/></Typography>
              </Container>
            <CardContent>
              {isEmptyData ? (
                <Typography variant="body1" align="center">No Data</Typography>
              ) : (
                <CharacterDetails
                  character={character}
                  openOrigin={openOrigin}
                  setOpenOrigin={setOpenOrigin}
                  openLocation={openLocation}
                  setOpenLocation={setOpenLocation}
                  openEpisode={openEpisode}
                  setOpenEpisode={setOpenEpisode}
                />
              )}
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <Container maxWidth="sm" sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '10vh',
        margin: 'auto',
        overflow: 'auto',
      }}>
        {parseInt(id) > 1 && (
          <Button onClick={handleFirst} sx={{
            backgroundColor: 'rgba(0, 40, 0, 0.8)',
            '&:hover': { backgroundColor: 'rgba(0, 40, 0, 0.9)' },
            '&:active': { backgroundColor: 'rgba(0, 40, 0, 1)' },
          }}>
            <SkipPreviousIcon fontSize="large" sx={{ color: 'white' }} />
          </Button>
        )}
        {parseInt(id) > 1 && (
          <Button onClick={handlePrev} sx={{
            backgroundColor: 'rgba(0, 40, 0, 0.8)',
            '&:hover': { backgroundColor: 'rgba(0, 40, 0, 0.9)' },
            '&:active': { backgroundColor: 'rgba(0, 40, 0, 1)' },
          }}>
            <ArrowBackIcon fontSize="large" sx={{ color: 'white' }} />
          </Button>
        )}
        <Button component={Link} to="/" color="inherit" sx={{
          backgroundColor: 'rgba(0, 40, 0, 0.8)',
          '&:hover': { backgroundColor: 'rgba(0, 40, 0, 0.9)' },
          '&:active': { backgroundColor: 'rgba(0, 40, 0, 1)' },
        }}>
          <HomeIcon fontSize="large" sx={{ color: 'white' }} />
        </Button>
        {parseInt(id) < characterCount && (
          <Button onClick={handleNext} sx={{
            backgroundColor: 'rgba(0, 40, 0, 0.8)',
            '&:hover': { backgroundColor: 'rgba(0, 40, 0, 0.9)' },
            '&:active': { backgroundColor: 'rgba(0, 40, 0, 1)' },
          }}>
            <ArrowForwardIcon fontSize="large" sx={{ color: 'white' }} />
          </Button>
        )}
        {parseInt(id) < characterCount && (
          <Button onClick={handleLast} sx={{
            backgroundColor: 'rgba(0, 40, 0, 0.8)',
            '&:hover': { backgroundColor: 'rgba(0, 40, 0, 0.9)' },
            '&:active': { backgroundColor: 'rgba(0, 40, 0, 1)' },
          }}>
            <SkipNextIcon fontSize="large" sx={{ color: 'white' }} />
          </Button>
        )}
      </Container>
    </Box>
  );
}
