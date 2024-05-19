import React, { useState, useEffect } from "react";
import { useQuery, gql } from '@apollo/client';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Container, Box, TextField, MenuItem, FormControl, Select, Typography, Button } from "@mui/material";
import './Table.css';

const GET_CHARACTERS_COUNT = gql`
  query {
    characters {
      info {
        count
      }
    }
  }
`;

const GET_CHARACTERS = gql`
  query CharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        dimension
      }
      location {
        name
        dimension
      }
      image
      episode {
        id
      }
    }
  }
`;

const columns = [
  { id: 'id', label: 'Id', minWidth: 100 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 100 },
  { id: 'species', label: 'Species', minWidth: 170 },
  { id: 'type', label: 'Type', minWidth: 100 },
  { id: 'gender', label: 'Gender', minWidth: 100 },
  { id: 'origin', label: 'Origin', minWidth: 170 },
  { id: 'location', label: 'Location', minWidth: 170 },
  { id: 'image', label: 'Image', minWidth: 100 },
  { id: 'episodesNumber', label: 'Appearances in Episodes', minWidth: 100 }
];

export default function FinalTable() {
  const [characterCount, setCharacterCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterGender, setFilterGender] = useState('');

  const { loading: loadingCount, error: errorCount, data: dataCount } = useQuery(GET_CHARACTERS_COUNT);
  
  useEffect(() => {
    if (dataCount) {
      setCharacterCount(dataCount.characters.info.count);
    }
  }, [dataCount]);

  const { loading: loadingCharacters, error: errorCharacters, data: dataCharacters } = useQuery(GET_CHARACTERS, {
    variables: { ids: Array.from({ length: characterCount }, (_, i) => i + 1) },
    skip: characterCount <= 0
  });

  useEffect(() => {
    if (dataCharacters) {
      const newRows = dataCharacters.charactersByIds.map(character => ({
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        type: character.type === '' ? 'Normal' : character.type,
        gender: character.gender,
        origin: character.origin.name,
        location: character.location.name,
        image: <img src={character.image} alt={character.name} style={{ width: 50, height: 50 }} />,
        episodesNumber: character.episode.length,
      }));
      setRows(newRows);
    }
  }, [dataCharacters]);

  useEffect(() => {
    const filtered = rows.filter(row => {
      let nameMatch = true;
      let statusMatch = true;
      let genderMatch = true;

      if (filterName.trim() !== '') {
        nameMatch = row.name.toLowerCase().includes(filterName.toLowerCase());
      }

      if (filterStatus !== '') {
        statusMatch = row.status === filterStatus;
      }

      if (filterGender !== '') {
        genderMatch = row.gender === filterGender;
      }

      return nameMatch && statusMatch && genderMatch;
    });

    setFilteredRows(filtered);
    setPage(0);
  }, [filterName, filterStatus, filterGender, rows]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleFilterGenderChange = (event) => {
    setFilterGender(event.target.value);
  };

  const handleReset = () => {
    setFilterName('');
    setFilterStatus('');
    setFilterGender('');
    setPage(0);
    setRowsPerPage(10);
  };

  if (loadingCount) return <p>Loading...</p>;
  if (errorCount) return <p>Error fetching character count: {errorCount.message}</p>;
  if (loadingCharacters) return <p>Loading characters...</p>;
  if (errorCharacters) return <p>Error fetching characters: {errorCharacters.message}</p>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }} maxWidth="lg">
        <Button variant="contained" onClick={handleReset}>Reset</Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
          <TextField
            label="Filter by name"
            variant="outlined"
            value={filterName}
            onChange={handleFilterNameChange}
            sx={{marginRight: '20px'}}
          />
          <FormControl variant="outlined" >
            <Select
              value={filterStatus}
              onChange={handleFilterStatusChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{marginRight: '20px'}}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="Alive">Alive</MenuItem>
              <MenuItem value="Dead">Dead</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <Select
              value={filterGender}
              onChange={handleFilterGenderChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">All Genders</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Genderless">Genderless</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant="h6" component="h1">
        Count of Rows: {filteredRows.length}
        </Typography>
      </Container>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  Brak danych
                </TableCell>
              </TableRow>
            ) : (
              filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }} maxWidth="md">
      <Pagination
          count={Math.ceil(filteredRows.length / rowsPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          color="primary"
          showFirstButton
          showLastButton
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
          <Typography variant="body1" component="span" sx={{marginRight: '20px'}}>
              Rows per page:
          </Typography>
          <FormControl variant="outlined">
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              displayEmpty
              inputProps={{ 'aria-label': 'Rows per page' }}
            >
              {[10, 20, 50, 100, 200, 400].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Container>
    </Paper>
  );
}
