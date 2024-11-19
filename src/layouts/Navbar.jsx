import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';


const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState(isAuthenticated);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setMobileMenuOpen(true);  // Open the mobile menu when the icon is clicked
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuOpen(false);  // Close the mobile menu when an item is clicked
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const menuItems = (
    <>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/" className="text-black">Home</Link>
      </MenuItem>
      {isAuthenticated ? (
        <MenuItem onClick={handleMenuClose}>
          <Link to="/login" className="text-black">Login</Link>
        </MenuItem>
      ) : ""}
      {!isAuthenticated ? (
        <MenuItem onClick={handleMenuClose}>
          <Link to="/signup" className="text-black">Signup</Link>
        </MenuItem>
      ) : ""}
      {isAuthenticated && (
        <MenuItem onClick={handleLogout}>
          <Link to="/login" className="text-black">Logout</Link>
        </MenuItem>
      )}
    </>
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#DDA0DD', boxShadow: 3 }}>
      <Toolbar>
        {/* Logo/Heading */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" className="text-white text-2xl font-bold">
            EmailFlow
          </Link>
        </Typography>

        {/* Desktop Links */}
        {isMobile ? (
          // Mobile menu button
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
        ) : (
          <div>
            <Button color="inherit">
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </Button>
            {!isAuthenticated ? (
              <Button color="inherit">
                <Link to="/login" className="hover:text-gray-300">Login</Link>
              </Button>
            ) : ""}
            {!isAuthenticated ? (
              <Button color="inherit">
              <Link to="/signup" className="hover:text-gray-300">Signup</Link>
            </Button>
            ) : ""}
            {isAuthenticated && (
              <Button color="inherit" onClick={handleLogout}>
                <Link to="/" className="hover:text-gray-300">Logout</Link>
              </Button>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={mobileMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {menuItems}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
