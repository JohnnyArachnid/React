import { FC } from "react";
import { AppBar, Toolbar, Typography, ThemeProvider } from '@mui/material';
import BarsTheme from '../BarsTheme.tsx';

const BottomBar: FC = (): JSX.Element => {
    return (
        <ThemeProvider theme={BarsTheme}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="subtitle1" component="h1" sx={{ textAlign: 'center', }}>
                        &copy; 2024 Fingoweb Internship Project, Autor: Daniel Szarek, Wersja 1.1.0
                    </Typography>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default BottomBar;
