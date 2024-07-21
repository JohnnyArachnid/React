import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Portal from './components/Portal/Portal.tsx';
import './ErrorPage.css';

function ErrorPage(props) {
  const location = useLocation();
  const message = location.state?.message || props.message;

  return (
    <Box className='Container'>
      <Portal displayData={`Error fetching data: ${message}`} isError={true} />
    </Box>
  );
};

export default ErrorPage;
