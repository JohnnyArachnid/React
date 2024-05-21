import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { 
  Paper,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Pagination, 
  Container, 
  Box, 
  TextField, 
  MenuItem, 
  FormControl, 
  Select, 
  Typography, 
  Button,
  InputAdornment,
  Avatar, 
} from "@mui/material";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AccountCircle from '@mui/icons-material/AccountCircle';
import './Table.css';

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

export default function FinalTable({ _, dataCharacters }) {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const navigate = useNavigate();

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
        image: <Avatar alt={character.name} src={character.image} sx={{margin: 'auto', width: '56px', height: '56px'}}/>,
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

  const handleRowClick = (id) => {
    navigate(`/character/${id}`);
  };

  return (
    <Paper sx={{
      minWidth: '60vw', 
      maxWidth: '90vw', 
      maxHeight: '90vh', 
      minHeight: '50vh', 
      overflow: 'auto', 
      margin: 'auto',
      backgroundColor: 'white',
      border: '5px solid black',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    }}>
      <Container sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '16px',
        borderRadius: '10px',
      }} 
      maxWidth="lg">
        <Button variant="contained" onClick={handleReset} sx={{
                backgroundColor: 'rgba(0, 40, 0, 0.8)',
                color: 'white',
                '&:hover': {
                    backgroundColor: 'rgba(0, 40, 0, 1)',
                    color: 'white',
                }
            }} size='large' startIcon={<RestartAltIcon />}>Reset</Button>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '16px', 
        }}>
          <TextField
            label="Filter by name"
            variant="filled"
            value={filterName}
            onChange={handleFilterNameChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle sx={{ color: 'white', mr: 1, my: 0.5 }}/>
                </InputAdornment>
              ),
            }}
            sx={{
              marginRight: '20px',
              borderRadius: '5px',
              backgroundColor: 'rgba(0, 40, 0, 0.8)',
              '& .MuiFilledInput-root': {
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 40, 0, 0.9)',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(0, 40, 0, 1)',
                },
              },
              '& .MuiFilledInput-underline:before': {
                borderBottomColor: 'white',
              },
              '& .MuiFilledInput-underline:after': {
                borderBottomColor: 'white',
              },
              '&:hover .MuiFilledInput-underline:before': {
                borderBottomColor: 'white',
              },
              '&.Mui-focused .MuiFilledInput-underline:after': {
                borderBottomColor: 'white',
              },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: 'white',
                },
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'white',
                opacity: 1,
              },
            }}
          />
          <FormControl variant="outlined" >
            <Select
              value={filterStatus}
              onChange={handleFilterStatusChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{
                marginRight: '20px',
                backgroundColor: 'rgba(0, 40, 0, 0.8)',
                color: 'white',
                '& .MuiSelect-icon': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 40, 0, 0.8)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 40, 0, 1)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 40, 0, 1)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 40, 0, 0.9)',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(0, 40, 0, 1)',
                },
              }}
            >
              <MenuItem value="" sx={{
                backgroundColor: 'rgba(0, 40, 0, 0.8)',
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 40, 0, 1)',
                }, '&:hover': {
                  color: 'rgba(0, 40, 0, 1)',
                }
              }}> All Statuses</MenuItem>
              <MenuItem value="Alive" sx={{
                backgroundColor: 'rgba(0, 40, 0, 0.8)',
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 40, 0, 1)',
                }, '&:hover': {
                  color: 'rgba(0, 40, 0, 1)',
                }
              }}>Alive</MenuItem>
              <MenuItem value="Dead" sx={{
                backgroundColor: 'rgba(0, 40, 0, 0.8)',
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 40, 0, 1)',
                }, '&:hover': {
                  color: 'rgba(0, 40, 0, 1)',
                }
              }}>Dead</MenuItem>
              <MenuItem value="unknown" sx={{
                backgroundColor: 'rgba(0, 40, 0, 0.8)',
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 40, 0, 1)',
                }, '&:hover': {
                  color: 'rgba(0, 40, 0, 1)',
                }
              }}>Unknown</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined">
            <Select
              value={filterGender}
              onChange={handleFilterGenderChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{
                marginRight: '20px',
                backgroundColor: 'rgba(0, 40, 0, 0.8)',
                color: 'white',
                '& .MuiSelect-icon': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 40, 0, 0.8)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 40, 0, 1)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 40, 0, 1)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 40, 0, 0.9)',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(0, 40, 0, 1)',
                },
              }}
            >
              <MenuItem value="" sx={{
                backgroundColor: 'rgba(0, 40, 0, 0.8)',
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 40, 0, 1)',
                }, '&:hover': {
                  color: 'rgba(0, 40, 0, 1)',
                }
              }}>All Genders</MenuItem>
              <MenuItem value="Male" sx={{
                backgroundColor: 'rgba(0, 40, 0, 0.8)',
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 40, 0, 1)',
                }, '&:hover': {
                  color: 'rgba(0, 40, 0, 1)',
                }
              }}>Male</MenuItem>
              <MenuItem value="Female" sx={{
                backgroundColor: 'rgba(0, 40, 0, 0.8)',
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 40, 0, 1)',
                }, '&:hover': {
                  color: 'rgba(0, 40, 0, 1)',
                }
              }}>Female</MenuItem>
              <MenuItem value="Genderless" sx={{
                backgroundColor: 'rgba(0, 40, 0, 0.8)',
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 40, 0, 1)',
                }, '&:hover': {
                  color: 'rgba(0, 40, 0, 1)',
                }
              }}>Genderless</MenuItem>
              <MenuItem value="unknown" sx={{
                backgroundColor: 'rgba(0, 40, 0, 0.8)',
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 40, 0, 1)',
                }, '&:hover': {
                  color: 'rgba(0, 40, 0, 1)',
                }
              }}>Unknown</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography variant="h4" component="h1" sx={{
          fontFamily: 'Get Schwifty, Roboto, Arial, sans-serif',
          color: 'rgba(0, 40, 0, 0.8)',
        }}>
          Count of Rows: {filteredRows.length}
        </Typography>
      </Container>
      <TableContainer sx={{ maxHeight: 440, }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ minWidth: column.minWidth,
                    backgroundColor: 'rgba(0, 40, 0, 1)',
                    textAlign: 'center',
                    color: 'white',
                    fontFamily: 'Get Schwifty, Roboto, Arial, sans-serif',
                    border: '1px solid black',
                    borderRadius: '2px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                    fontSize: '1.2vw',
                   }}
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
                  No data
                </TableCell>
              </TableRow>
            ) : (
              filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow 
                  hover
                  role="checkbox" 
                  tabIndex={-1} 
                  key={row.id}
                  onClick={() => handleRowClick(row.id)}
                  sx={{ cursor: 'pointer', }}
                >
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align} sx={{ textAlign:'center',
                        color: 'rgba(0, 40, 0, 0.8)',
                      }}>
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
      <Container sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '16px', 
      }} 
      maxWidth="lg">
      <Pagination
          count={Math.ceil(filteredRows.length / rowsPerPage)}
          page={page + 1}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
          size="large"
          variant="outlined"
          shape="rounded"
          sx={{
            marginRight: '20px',
            '& .MuiPaginationItem-root': {
              color: 'rgba(0, 40, 0, 0.8)',
              fontWeight: 'bold',
            },
            '& .Mui-selected': {
              color: 'rgba(0, 40, 0, 1)',
            },
            '& .MuiPaginationItem-ellipsis': {
              color: 'rgba(0, 40, 0, 1)',
            },
            '& .MuiPaginationItem-page:hover': {
              color: 'rgba(0, 40, 0, 0.9)',
            },
            '& .MuiPaginationItem-previousNext, & .MuiPaginationItem-firstLast': {
              color: 'rgba(0, 40, 0, 0.8)',
            },
            '& .MuiPaginationItem-previousNext:hover, & .MuiPaginationItem-firstLast:hover': {
              color: 'rgba(0, 40, 0, 0.9)',
            },
          }}
        />
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '16px', 
        }}>
          <Typography variant="h4" component="h1" sx={{
            fontFamily: 'Get Schwifty, Roboto, Arial, sans-serif',
            color: 'rgba(0, 40, 0, 0.8)',
            marginRight: '20px',
          }}>
              Rows per page:
          </Typography>
          <FormControl variant="outlined">
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              displayEmpty
              inputProps={{ 'aria-label': 'Rows per page' }}
              sx={{
                marginRight: '20px',
                backgroundColor: 'rgba(0, 40, 0, 0.8)',
                color: 'white',
                '& .MuiSelect-icon': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 40, 0, 0.8)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 40, 0, 1)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(0, 40, 0, 1)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 40, 0, 0.9)',
                },
                '&.Mui-focused': {
                  backgroundColor: 'rgba(0, 40, 0, 1)',
                },
              }}
            >
              {[10, 20, 50, 100, 200, 400].map((option) => (
                <MenuItem key={option} value={option}
                sx={{
                  backgroundColor: 'rgba(0, 40, 0, 0.8)',
                  color: 'white',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(0, 40, 0, 1)',
                  }, '&:hover': {
                    color: 'rgba(0, 40, 0, 1)',
                  }
                }}>
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
