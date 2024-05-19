import { AppBar, Toolbar, Button } from '@mui/material';
import './TopBar.css';

export default function TopBar() {
    return (
        <AppBar position="static" sx={{ top: 0, bottom: 'auto' }}>
            <Toolbar style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Button color="inherit">Button</Button>
            </Toolbar>
        </AppBar>
    );
}
