import { AppBar, Toolbar, Typography } from '@mui/material';
import './BottomBar.css';

export default function BottomBar() {
    const currentYear = new Date().getFullYear();

    return (
        <AppBar position="static" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar style={{ display: 'flex', alignItems: 'center', justifyContent: ''}}>
                <Typography variant="subtitle1" component="h1">
                    &copy; {currentYear} Fingoweb Internship Project, Autor: Daniel Szarek
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
