import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import './TopBar.css';

export default function TopBar() {
    return (
        <AppBar position="static" sx={{ top: 0, bottom: 'auto' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Button component={Link} to="/" color="inherit">
                    Home
                </Button>
            </Toolbar>
        </AppBar>
    );
}
