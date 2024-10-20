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
  }, [localStorage.getItem('token')]); // Empty dependency array ensures this only runs once when the component mounts

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false); // Ensure state is updated to reflect logout
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
          maxWidth: '1500px', 
          padding: '10px 20px'  
      }}>
        <Toolbar>
          <Typography
            variant="h4"
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
            <Button component={Link} to="/" sx={{ color: 'white', fontWeight: "bold" }}>
              Home
            </Button>
            {isAuthenticated ? (
               <>
               <Button component={Link} to="/saved" sx={{ color: 'white', fontWeight: "bold" }}>
                 Saved
               </Button>
               <Button onClick={handleLogout} sx={{ color: 'white', fontWeight: "bold" }}>
                 Logout
               </Button>  
             </>    
            ) : (
              <>
                <Button component={Link} to="/register" sx={{ color: 'white', fontWeight: "bold" }}>
                  Register
                </Button>
                <Button component={Link} to="/login" sx={{ color: 'white', fontWeight: "bold" }}>
                  Login
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
            }}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/">
              Home
            </MenuItem>
            {isAuthenticated ? (
              <>
                <MenuItem onClick={handleLogout}>
                 Logout
                </MenuItem>   
               <MenuItem onClick={handleMenuClose} component={Link} to="/saved">
                 Saved
               </MenuItem>
              </>
            ) : (                
             <>
             <MenuItem onClick={handleMenuClose} component={Link} to="/login">
               Login
             </MenuItem>                    
             <MenuItem onClick={handleMenuClose} component={Link} to="/register">
               Register
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
