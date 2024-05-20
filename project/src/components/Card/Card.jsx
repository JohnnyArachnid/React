import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
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
        maxHeight: '57vh',
      }} aria-label="character details">
      <ListItem>
        <ListItemText primary="ID" secondary={character.id || "No Data"} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Status" secondary={character.status || "No Data"} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Species" secondary={character.species || "No Data"} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Type" secondary={character.type || "Normal"} />
      </ListItem>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Gender" secondary={character.gender || "No Data"} />
      </ListItem>
      <Divider component="li" />
      <ListItem button onClick={() => setOpenOrigin(!openOrigin)}>
        <ListItemText primary="Origin" secondary={character.origin.name || "No Data"} />
      </ListItem>
      <Collapse in={openOrigin} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">Type: {character.origin.type || "No Data"}</Typography>
          <Typography variant="body2">Dimension: {character.origin.dimension || "No Data"}</Typography>
          <Typography variant="body2">Number of Citizens: {character.origin.residents.length}</Typography>
          <Typography variant="body2">Created: {character.origin.created || "No Data"}</Typography>
        </CardContent>
      </Collapse>
      <Divider component="li" />
      <ListItem button onClick={() => setOpenLocation(!openLocation)}>
        <ListItemText primary="Location" secondary={character.location.name || "No Data"} />
      </ListItem>
      <Collapse in={openLocation} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">Type: {character.location.type || "No Data"}</Typography>
          <Typography variant="body2">Dimension: {character.location.dimension || "No Data"}</Typography>
          <Typography variant="body2">Number of Citizens: {character.location.residents.length || "No Data"}</Typography>
          <Typography variant="body2">Created: {character.location.created || "No Data"}</Typography>
        </CardContent>
      </Collapse>
      <Divider component="li" />
      <ListItem button onClick={() => setOpenEpisode(!openEpisode)}>
        <ListItemText primary="Episode Count" secondary={character.episode.length} />
      </ListItem>
      <Collapse in={openEpisode} timeout="auto" unmountOnExit>
        <List>
          {character.episode.map((ep, index) => (
            <React.Fragment key={ep.id}>
              <ListItem>
                <Grid container>
                  <Grid item xs={4}>
                    <ListItemText primary="Episode Name" secondary={ep.name || "No Data"} sx={{ textAlign: 'center', }} />
                  </Grid>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Grid item xs={4}>
                    <ListItemText primary="Episode Number" secondary={ep.episode || "No Data"} sx={{ textAlign: 'center', }} />
                  </Grid>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Grid item xs={3.9}>
                    <ListItemText primary="Episode Air Date" secondary={ep.air_date || "No Data"} sx={{ textAlign: 'center', }} />
                  </Grid>
                </Grid>
              </ListItem>
              {index !== character.episode.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Collapse>
      <Divider component="li" />
      <ListItem>
        <ListItemText primary="Created" secondary={character.created || "No Data"} />
      </ListItem>
    </List>
  );
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

  return (
    <Box sx={{ margin: 'auto', overflow: 'auto', }}>
      <Card sx={{ minWidth: '60vw', maxWidth: '90vw', maxHeight: '90vh', minHeight: '50vh', }} raised={true}>
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
                }
              }} />
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
      <Container maxWidth="xl" sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '10vh',
        paddingY: 2,
      }}>
        <Button onClick={handlePrev}>Prev</Button>
        <Button onClick={handleNext}>Next</Button>
      </Container>
    </Box>
  );
}
