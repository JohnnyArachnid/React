import { Box, Typography } from '@mui/material';
import './Portal.css';

export default function Portal({ displayData, isError }) {
  return (
    <Box className={`Portal ${isError ? 'noRotate' : ''}`}>
      <Box className="PortalBackground"></Box>
      <img src='/logo.png' alt="Logo" className="PortalLogo" />
      <Typography
        className="PortalText"
        variant="h4"
        component="h1"
        style={{ fontSize: 'calc(1.5vw + 1.5vh)',
        fontFamily: 'Get Schwifty, Roboto, Arial, sans-serif',
         }}
      >
        {displayData}
      </Typography>
    </Box>
  );
}
