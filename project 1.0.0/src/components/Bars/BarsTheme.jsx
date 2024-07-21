import { createTheme } from '@mui/material/styles';

const BarsTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          top: 0,
          bottom: 'auto',
          backgroundColor: 'rgba(0, 40, 0, 0.9)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
    },
  },
});

export default BarsTheme;
