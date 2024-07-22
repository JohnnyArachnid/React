import { FC } from "react";
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Portal.css';

const commonStyles = {
  backgroundColor: 'rgba(0, 40, 0, 0.8)',
  color: 'white',
  '&.Mui-selected': { backgroundColor: 'rgba(0, 40, 0, 1)' },
  '&:hover': { color: 'rgba(0, 40, 0, 1)' },
};

interface PortalProps {
  displayData: string;
  isError: boolean;
}

const Portal: FC<PortalProps> = ({ displayData, isError }): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Box className={`Portal ${isError ? 'noRotate' : ''}`}>
      <Box className="PortalBackground"></Box>
      <img src='/logo.png' alt="Logo" className="PortalLogo" />
      <Typography className="PortalText" variant="h4" component="h1" mb={3} style={{ fontFamily: 'Get Schwifty, Roboto, Arial, sans-serif', }}>
        {displayData}
      </Typography>
      {isError && (<Button sx={{ ...commonStyles, backgroundColor: 'rgba(0, 40, 0, 0.8)', '&:hover': { backgroundColor: 'rgba(0, 40, 0, 1)' }, }} size='large' onClick={() => navigate('/')}>
        Go Home
      </Button>)}
    </Box>
  );
}

export default Portal;
