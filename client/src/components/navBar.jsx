import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../utils/axiosInstance';

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  // Toggle drawer for mobile view
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <AppBar position="static" sx={{ color: 'white', boxShadow: 'none' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'black',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box sx={{ backgroundColor: 'yellow', width: 30, height: 30, marginRight: 1 }}></Box>
            FitMeal
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button component={Link} to="/" sx={{ color: 'black', fontWeight: 'bold' }}>
              Home
            </Button>
            {isAuthenticated && (
              <>
                <Button component={Link} to="/saved" sx={{ color: 'black', fontWeight: 'bold' }}>
                  Saved
                </Button>
                <Button onClick={handleLogout} sx={{ color: 'black', fontWeight: 'bold' }}>
                  Logout
                </Button>
              </>
            )}
          </Box>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ display: { xs: 'block', md: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile view */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
          <IconButton sx={{ marginLeft: 'auto' }} onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
          <List>
            <ListItem button component={Link} to="/" onClick={toggleDrawer}>
              <ListItemText primary="Home" />
            </ListItem>
            {isAuthenticated && (
              <>
                <ListItem button component={Link} to="/saved" onClick={toggleDrawer}>
                  <ListItemText primary="Saved" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
