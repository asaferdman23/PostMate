import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu'; // Make sure this line is added
import EmailFilter from './EmailFilter';
import GmailIcon from '../assets/images/gmail_icon.png';
import '../assets/css/index.css';

function AppHeader({ onDrawerToggle,onSetFilter }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className='app-header' sx={{ boxShadow: 0, backgroundColor:'#F6F8FC' }}>
      <Toolbar>
        <IconButton
          edge="start"
          aria-label="open drawer"
          onClick={onDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Link to="/" className="brand">
          <img src={GmailIcon} alt="Gmail" className="gmail-icon" />
          <Typography sx={{ color:'#202124'}} variant="h6" className="title">
            Gmail
          </Typography>
        </Link>
        <div className="search">
          <InputBase
          color='#eaf1fb'
          sx={{ paddingLeft: '55px'}}
            placeholder="Search"
            value={searchText}
            onChange={handleSearchTextChange}
            classes={{
              root: 'input-root',
              input: 'input-input',
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;