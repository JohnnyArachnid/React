import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Container, Box, TextField, MenuItem, FormControl, Select, Typography, Button, InputAdornment, Avatar, } from "@mui/material";
import { RestartAlt, AccountCircle, ChangeCircle} from '@mui/icons-material';
import { useQuery, gql } from '@apollo/client';
import Portal from '../Portal/Portal.tsx';

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $filterName: String, $filterStatus: String, $filterGender: String) {
    characters(page: $page, filter: { name: $filterName, status: $filterStatus, gender: $filterGender }) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
        episode {
          id
        }
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
  const [page, setPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [localFilters, setLocalFilters] = useState({ name: '', status: '', gender: '' });
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
    variables: {
      page: page,
      filterName: localFilters.name,
      filterStatus: localFilters.status,
      filterGender: localFilters.gender,
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (error) {
      if (error.networkError) {
        navigate('/500', { state: { message: `Error fetching data: ${error.message}` } });
      } else if (error.graphQLErrors.some(e => e.extensions?.code === '404')) {
        navigate('/404', { state: { message: `Error fetching data: ${error.message}` } });
      } else {
        navigate('/500', { state: { message: `Error fetching data: ${error.message}` } });
      }
    }
  }, [error, navigate]);

  if (loading) {
    return (
      <Box className='Container'>
        <Portal displayData={'Loading ...'} isError={false}/>
      </Box>
    );
  }

  const rows = data?.characters?.results.map(character => ({
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    type: character.type === '' ? 'Normal' : character.type,
    gender: character.gender,
    origin: character.origin.name,
    location: character.location.name,
    image: <Avatar alt={character.name} src={character.image} sx={{ margin: 'auto', width: '56px', height: '56px', }}/>,
    episodesNumber: character.episode.length,
  })) || [];

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
    refetch();
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
    setPage(1);
    setFilterName('');
    setFilterStatus('');
    setFilterGender('');
    setLocalFilters({ name: '', status: '', gender: '' });
    refetch();
  };

  const handleApplyFilters = () => {
    setLocalFilters({ name: filterName, status: filterStatus, gender: filterGender });
    refetch();
  };

  const handleRowClick = (id) => {
    navigate(`/character/${id}`);
  };

  const commonStyles = {
    backgroundColor: 'rgba(0, 40, 0, 0.8)',
    color: 'white',
    '&.Mui-selected': { backgroundColor: 'rgba(0, 40, 0, 1)' },
    '&:hover': { color: 'rgba(0, 40, 0, 1)' },
  };

  const inputStyles = {
    marginRight: '20px',
    backgroundColor: 'rgba(0, 40, 0, 0.8)',
    borderRadius: '5px',
    '& .MuiFilledInput-root': {
      color: 'white',
      '&:hover': { backgroundColor: 'rgba(0, 40, 0, 0.9)' },
      '&.Mui-focused': { backgroundColor: 'rgba(0, 40, 0, 1)' },
    },
    '& .MuiFilledInput-underline:before': { borderBottomColor: 'white' },
    '& .MuiFilledInput-underline:after': { borderBottomColor: 'white' },
    '&:hover .MuiFilledInput-underline:before': { borderBottomColor: 'white' },
    '&.Mui-focused .MuiFilledInput-underline:after': { borderBottomColor: 'white' },
    '& .MuiInputLabel-root': {
      color: 'white',
      '&.Mui-focused': { color: 'white' },
    },
    '& .MuiInputBase-input': { color: 'white' },
    '& .MuiInputBase-input::placeholder': { color: 'white', opacity: 1 },
  };

  const selectStyles = {
    marginRight: '20px', backgroundColor: 'rgba(0, 40, 0, 0.8)', color: 'white',
    '& .MuiSelect-icon': { color: 'white', },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 40, 0, 0.8)' , },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 40, 0, 1)', },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 40, 0, 1)', },
    '&:hover': { backgroundColor: 'rgba(0, 40, 0, 0.9)', },
    '&.Mui-focused': { backgroundColor: 'rgba(0, 40, 0, 1)', },
  };

  return (
    <Paper sx={{ minWidth: '60vw', maxWidth: '90vw', maxHeight: '90vh', minHeight: '50vh', overflow: 'auto', margin: 'auto', backgroundColor: 'white', border: '5px solid black', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', }}>
      <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: '10px', }} maxWidth="lg">
        <Button variant="contained" onClick={handleReset} sx={{ ...commonStyles, backgroundColor: 'rgba(0, 40, 0, 0.8)', '&:hover': { backgroundColor: 'rgba(0, 40, 0, 1)' }, }} size='large' startIcon={<RestartAlt />}>Reset</Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
          <TextField label="Filter by name" variant="filled" value={filterName} onChange={handleFilterNameChange} InputProps={{ startAdornment: (
            <InputAdornment position="start">
              <AccountCircle sx={{ color: 'white', mr: 1, my: 0.5, }} />
            </InputAdornment>) }} sx={inputStyles}
          />
          <FormControl variant="outlined">
            <Select value={filterStatus} onChange={handleFilterStatusChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }} sx={{ ...selectStyles }}>
              <MenuItem value="" sx={commonStyles}>All Statuses</MenuItem>
              <MenuItem value="Alive" sx={commonStyles}>Alive</MenuItem>
              <MenuItem value="Dead" sx={commonStyles}>Dead</MenuItem>
              <MenuItem value="unknown" sx={commonStyles}>Unknown</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <Select value={filterGender} onChange={handleFilterGenderChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }} sx={{ ...selectStyles }}>
              <MenuItem value="" sx={commonStyles}>All Genders</MenuItem>
              <MenuItem value="Male" sx={commonStyles}>Male</MenuItem>
              <MenuItem value="Female" sx={commonStyles}>Female</MenuItem>
              <MenuItem value="Genderless" sx={commonStyles}>Genderless</MenuItem>
              <MenuItem value="unknown" sx={commonStyles}>Unknown</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant="h4" component="h1" sx={{ fontFamily: 'Get Schwifty, Roboto, Arial, sans-serif', color: 'rgba(0, 40, 0, 0.8)', }}>
          Count of Rows: {data?.characters?.info.count}
        </Typography>
      </Container>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth, backgroundColor: 'rgba(0, 40, 0, 1)', textAlign: 'center', color: 'white', fontFamily: 'Get Schwifty, Roboto, Arial, sans-serif', border: '1px solid black', borderRadius: '2px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', fontSize: '1.2vw', }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">No data</TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => handleRowClick(row.id)} sx={{ cursor: 'pointer', }}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} sx={{ textAlign: 'center', color: 'rgba(0, 40, 0, 0.8)', }}>
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
      <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', }} maxWidth="lg">
        <Pagination count={data?.characters?.info.pages} page={page} onChange={handleChangePage} showFirstButton showLastButton size="large" variant="outlined" shape="rounded" sx={{
            marginRight: '20px', '& .MuiPaginationItem-root': { color: 'rgba(0, 40, 0, 0.8)', fontWeight: 'bold' },
            '& .Mui-selected': { color: 'rgba(0, 40, 0, 1)' }, '& .MuiPaginationItem-ellipsis': { color: 'rgba(0, 40, 0, 1)' },
            '& .MuiPaginationItem-page:hover': { color: 'rgba(0, 40, 0, 0.9)' },
            '& .MuiPaginationItem-previousNext, & .MuiPaginationItem-firstLast': { color: 'rgba(0, 40, 0, 0.8)' },
            '& .MuiPaginationItem-previousNext:hover, & .MuiPaginationItem-firstLast:hover': { color: 'rgba(0, 40, 0, 0.9)' },
          }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', }}>
          <Typography variant="h4" component="h1" sx={{ fontFamily: 'Get Schwifty, Roboto, Arial, sans-serif', color: 'rgba(0, 40, 0, 0.8)', marginRight: '20px', }}>
              Apply changes:
            </Typography>
          <Button variant="contained" onClick={handleApplyFilters} sx={{ ...commonStyles, backgroundColor: 'rgba(0, 40, 0, 0.8)', '&:hover': { backgroundColor: 'rgba(0, 40, 0, 1)' }, }} size='large'><ChangeCircle sx={{ color: 'white', fontSize: 30}}/></Button>
        </Box>
      </Container>
    </Paper>
  );
}
