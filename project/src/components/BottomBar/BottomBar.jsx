import { AppBar, Toolbar, Typography } from '@mui/material';
import './BottomBar.css';

export default function BottomBar() {
    return (
        <AppBar position="static" sx={{ top: 'auto', bottom: 0, backgroundColor: 'rgba(0, 40, 0, 0.9)', }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                <Typography variant="subtitle1" component="h1">
                    &copy; 2024 Fingoweb Internship Project, Autor: Daniel Szarek
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
