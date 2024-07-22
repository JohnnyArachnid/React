import { useState, useEffect, ChangeEvent, FC } from "react";
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Container, Box, TextField, MenuItem, FormControl, Select, Typography, Button, InputAdornment, Avatar, ThemeProvider, SelectChangeEvent } from "@mui/material";
import { RestartAlt, AccountCircle, ChangeCircle } from '@mui/icons-material';
import { GET_CHARACTERS, Character, QueryData } from './FinalTableQuery';
import FinalTableTheme from "./FinalTableTheme";
import Portal from '../Portal/Portal';

const columns: { id: string; label: string; minWidth: number }[] = [
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

const FinalTable: FC = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [filterName, setFilterName] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterGender, setFilterGender] = useState<string>('');
  const [localFilters, setLocalFilters] = useState<{ name: string; status: string; gender: string }>({ name: '', status: '', gender: '' });
  const [count, setCount] = useState<number | null>(null);
  const navigate = useNavigate();

  const { loading, error, data } = useQuery<QueryData>(GET_CHARACTERS, {
    variables: {
      page: page,
      filterName: localFilters.name,
      filterStatus: localFilters.status,
      filterGender: localFilters.gender,
    },
    fetchPolicy: "network-only",
  });

  useEffect((): void => {
    if (data?.characters?.info?.count !== undefined) {
      setCount(data.characters.info.count);
    }
  }, [data]);

  useEffect((): void => {
    if (error) {
      if (error.networkError) {
        navigate('/500', { state: { message: `Error fetching data: ${error.message}` } });
      } else if (error.graphQLErrors.some((e: any): boolean => e.extensions?.code === '404')) {
        navigate('/404', { state: { message: `Error fetching data: ${error.message}` } });
      } else {
        navigate('*', { state: { message: `Error fetching data: ${error.message}` } });
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

  const rows: any[] = data?.characters?.results.map((character: Character): any => ({
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    type: character.type === '' ? 'Normal' : character.type,
    gender: character.gender,
    origin: character.origin.name,
    location: character.location.name,
    image: <Avatar alt={character.name} src={character.image} sx={{ margin: 'auto', width: '56px', height: '56px' }}/>,
    episodesNumber: character.episode.length,
  })) || [];

  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number): void => {
    setPage(newPage);
  };

  const handleFilterNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFilterName(event.target.value);
  };

  const handleFilterStatusChange = (event: SelectChangeEvent<string>): void => {
    setFilterStatus(event.target.value as string);
  };

  const handleFilterGenderChange = (event: SelectChangeEvent<string>): void => {
    setFilterGender(event.target.value as string);
  };

  const handleReset = (): void => {
    setPage(1);
    setFilterName('');
    setFilterStatus('');
    setFilterGender('');
    setLocalFilters({ name: '', status: '', gender: '' });
  };

  const handleApplyFilters = (): void => {
    setLocalFilters({ name: filterName, status: filterStatus, gender: filterGender });
  };

  const handleRowClick = (id: string): void => {
    navigate(`/character/${id}`);
  };

  return (
    <ThemeProvider theme={FinalTableTheme}>
      <Paper>
        <Container>
          <Button variant="contained" onClick={handleReset} size='large' startIcon={<RestartAlt />}>Reset</Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
            <TextField label="Filter by name" variant="filled" value={filterName} onChange={handleFilterNameChange} InputProps={{ startAdornment: (
              <InputAdornment position="start">
                <AccountCircle sx={{ color: 'white', mr: 1, my: 0.5 }} />
              </InputAdornment>) }}
            />
            <FormControl variant="outlined">
              <Select value={filterStatus} onChange={handleFilterStatusChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="Alive">Alive</MenuItem>
                <MenuItem value="Dead">Dead</MenuItem>
                <MenuItem value="unknown">Unknown</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined">
              <Select value={filterGender} onChange={handleFilterGenderChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="">All Genders</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Genderless">Genderless</MenuItem>
                <MenuItem value="unknown">Unknown</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography variant="h4" component="h1" sx={{ fontFamily: 'Get Schwifty, Roboto, Arial, sans-serif', color: 'rgba(0, 40, 0, 0.8)' }}>
            Count of Rows: {count || 0 }
          </Typography>
        </Container>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column): JSX.Element => (
                  <TableCell key={column.id} align="center">
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
                rows.map((row): JSX.Element => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={(): void => handleRowClick(row.id)} sx={{ cursor: 'pointer' }}>
                    {columns.map((column): JSX.Element => {
                      const value: any = row[column.id];
                      return (
                        <TableCell key={column.id} align="center">
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
        <Container>
          <Pagination count={data?.characters?.info.pages || 0} page={page} onChange={handleChangePage} showFirstButton showLastButton size="large" variant="outlined" shape="rounded" />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
            <Typography variant="h4" component="h1" sx={{ fontFamily: 'Get Schwifty, Roboto, Arial, sans-serif', color: 'rgba(0, 40, 0, 0.8)', marginRight: '20px' }}>
              Apply changes:
            </Typography>
            <Button variant="contained" onClick={handleApplyFilters} size='large'><ChangeCircle sx={{ color: 'white', fontSize: 30 }}/></Button>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}

export default FinalTable;
