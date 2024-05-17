import React, { useState, useEffect } from "react";
import { useQuery, gql } from '@apollo/client';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import './Table.css';

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

const GET_CHARACTERS_COUNT = gql`
  query {
    characters {
      info {
        count
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

function FinalTable() {
  const [characterCount, setCharacterCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filteredRowCount, setFilteredRowCount] = useState(0);
  const [rows, setRows] = useState([]);

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

  const startIndeks = page * rowsPerPage + 1;
  const endIndeks = (page + 1) * rowsPerPage;

  const filteredRows = rows.filter(row => {
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

  const { loading: loadingCount, error: errorCount, data: dataCount } = useQuery(GET_CHARACTERS_COUNT);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { ids: Array.from({ length: endIndeks - startIndeks + 1 }, (_, i) => startIndeks + i) },
  });

  useEffect(() => {
    if (dataCount) {
      setCharacterCount(dataCount.characters.info.count);
    }
  }, [dataCount]);

  useEffect(() => {
    if (data) {
      const newRows = data.charactersByIds.map(character => ({
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
  }, [data]);

  useEffect(() => {
    setFilteredRowCount(filteredRows.length);
  }, [filterName, filterStatus, filterGender, rows]);

  if (loading || loadingCount) return <p>Loading...</p>;
  if (error || errorCount) return <p>Error : {error?.message || errorCount?.message}</p>;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }} maxWidth="md">
        <TextField
          label="Filter by name"
          variant="outlined"
          value={filterName}
          onChange={handleFilterNameChange}
        />
        <FormControl variant="outlined">
          <Select
            value={filterStatus}
            onChange={handleFilterStatusChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
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
        <Typography variant="h6" component="h1">
        Count of Rows: {filteredRowCount}
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
              filteredRows.map((row) => (
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
          count={Math.ceil(characterCount / rowsPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          color="primary"
          showFirstButton
          showLastButton
        />
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, 100, 200, 400]}
          component="div"
          count={characterCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onPageChange={(_, newPage) => { setPage(newPage); }}
          className='Pagination'
        />
      </Container>
    </Paper>
  );
}

export default FinalTable;
