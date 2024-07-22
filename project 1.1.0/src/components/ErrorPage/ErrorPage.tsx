import { FC } from "react";
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Portal from '../Portal/Portal';
import './ErrorPage.css';

const ErrorPage: FC<{ message: string }> = ({ message }): JSX.Element => {
  const location = useLocation();
  const errorMessage = location.state?.message || message;
  return (
    <Box className='Container'>
      <Portal displayData={`Error fetching data: ${errorMessage}`} isError={true} />
    </Box>
  );
};

export default ErrorPage;
