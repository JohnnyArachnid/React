import { AppBar, Toolbar, Button } from '@mui/material';
import './TopBar.css';

export default function TopBar() {
    return (
        <AppBar position="static" sx={{ top: 0, bottom: 'auto', backgroundColor: 'rgba(0, 40, 0, 0.9)' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src='/mainPageButton.png' alt="Main Page Button" style={{width: '356px', height: '56px'}}/>
            </Toolbar>
        </AppBar>
    );
}
