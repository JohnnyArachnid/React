import { AppBar, Toolbar, Typography, ThemeProvider } from '@mui/material';
import BarsTheme from '../BarsTheme.jsx';

export default function BottomBar() {
    return (
        <ThemeProvider theme={BarsTheme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="subtitle1" component="h1">
                        &copy; 2024 Fingoweb Internship Project, Autor: Daniel Szarek
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
