import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navbar from './navBar';

const Layout = () => {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />
      
      {/* Main content */}
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Layout;
