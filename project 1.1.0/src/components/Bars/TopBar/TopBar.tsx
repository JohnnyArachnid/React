import { AppBar, Toolbar, ThemeProvider } from '@mui/material';
import BarsTheme from '../BarsTheme.js';

export default function TopBar() {
  return (
    <ThemeProvider theme={BarsTheme}>
      <AppBar position="static">
        <Toolbar>
          <img src='/logo.png' alt="Main Page Button" style={{ width: '356px', height: '56px', }} />
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
