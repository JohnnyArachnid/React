import { createTheme } from '@mui/material/styles';

const FinalTableTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
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
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          borderRadius: '10px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: 'rgba(0, 40, 0, 0.8)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0, 40, 0, 1)' },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 40, 0, 0.8)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0, 40, 0, 1)' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
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
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          marginRight: '20px',
          backgroundColor: 'rgba(0, 40, 0, 0.8)',
          color: 'white',
          '& .MuiSelect-icon': { color: 'white' },
          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 40, 0, 0.8)' },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 40, 0, 1)' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 40, 0, 1)' },
          '&:hover': { backgroundColor: 'rgba(0, 40, 0, 0.9)' },
          '&.Mui-focused': { backgroundColor: 'rgba(0, 40, 0, 1)' },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          minWidth: '100px',
          backgroundColor: 'rgba(0, 40, 0, 1)',
          textAlign: 'center',
          color: 'white',
          fontFamily: 'Get Schwifty, Roboto, Arial, sans-serif',
          border: '1px solid black',
          borderRadius: '2px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          fontSize: '1.2vw',
        },
        body: {
          textAlign: 'center',
          color: 'rgba(0, 40, 0, 0.8)',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 40, 0, 0.8)',
          fontWeight: 'bold',
          '&.Mui-selected': { color: 'rgba(0, 40, 0, 1)' },
          '& .MuiPaginationItem-ellipsis': { color: 'rgba(0, 40, 0, 1)' },
          '& .MuiPaginationItem-page:hover': { color: 'rgba(0, 40, 0, 0.9)' },
          '& .MuiPaginationItem-previousNext, & .MuiPaginationItem-firstLast': { color: 'rgba(0, 40, 0, 0.8)' },
          '& .MuiPaginationItem-previousNext:hover, & .MuiPaginationItem-firstLast:hover': { color: 'rgba(0, 40, 0, 0.9)' },
        },
      },
    },
  },
});

export default FinalTableTheme;