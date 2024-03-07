// Import additional components from MUI
import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import '../assets/css/cmps/NavBar.css';

function AppHeader() {
  // State to control the anchor of the menu (null is closed)
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className='app-header'>
      <section className='container'>
    <AppBar position="static" className="appBar">
      <Toolbar className="toolbar">
        <IconButton
          edge="start"
          className="menuButton"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu} // Handle opening menu
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)} // Controlled by state
          onClose={handleClose} // Handle closing menu
        >
          {/* Add MenuItems here */}
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>
        <Typography variant="h6" className="title">
          Gmail
        </Typography>
        <div className="search">
          <div className="searchIcon">
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: "inputRoot",
              input: "inputInput",
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <IconButton className="accountButton" color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
    </section>
    </header>
  );
}

export default AppHeader;
