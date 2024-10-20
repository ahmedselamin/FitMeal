import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
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

  // Handle mobile menu open
 const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle mobile menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="sticky" sx={{
          backgroundColor: '#005477',
          color: 'white',
          borderRadius: "40px",
          margin: '0 auto',
          maxWidth: '1200px', 
          padding: '10px 20px'  
          }}>
        <Toolbar>
          <Typography
            variant="h3"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
            }}
          >
           FitMeal
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button component={Link} to="/" sx={{ color: 'white' }}>
              Home
            </Button>
            {!isAuthenticated && (
              <>
                <Button component={Link} to="/register" sx={{ color: 'white'}}>
                Register
              </Button>
              <Button component={Link} to="/login" sx={{ color: 'white'}}>
                Login
              </Button>
              </>
            )}
            {isAuthenticated && (
              <>
                <Button component={Link} to="/saved" sx={{ color: 'white' }}>
                  Saved
                </Button>
                <Button onClick={handleLogout} sx={{ color: 'white' }}>
                  Logout
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Mobile Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ 
                display: { xs: 'block', md: 'none' },
                '& .MuiPaper-root': {
                  minWidth: '250px', // Increase the width for better mobile experience
                  padding: '10px', // Add padding around the menu
                },
            }}>
                    
            <MenuItem onClick={handleMenuClose} component={Link} to="/">
              Home
            </MenuItem>
            {!isAuthenticated && (
               <>
                 <MenuItem onClick={handleMenuClose} component={Link} to="/register">
                    Register
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} component={Link} to="/login">
                      Login
                  </MenuItem>                    
               </>         
            )}
            {isAuthenticated && (
              <>
                <MenuItem onClick={handleMenuClose} component={Link} to="/saved">
                  Saved
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
