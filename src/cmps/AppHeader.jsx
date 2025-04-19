import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu'; 

import SearchBar from './SearchBar';  
import EmailFilter from './EmailFilter';
import PostMateIcon from '../assets/images/PostMate_Red_Logo_CleanTransparent.png';
import '../assets/css/index.css';

function AppHeader({ onDrawerToggle,onSetFilter ,emailSearchText, onSearchTextChange}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className='app-header' sx={{ boxShadow: 0, bgcolor: '#F6F8FC' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton
          size='large'
          edge="start"
          onClick={onDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Link to="/" className="brand">
            <img src={PostMateIcon} alt="PostMate" className="gmail-icon" style={{ width: '180px', height: '50px' }} />
          </Link>
        <div className="brand-search-container">
          <SearchBar searchText={emailSearchText} />
        </div>
        <IconButton
          onClick={handleProfileMenuOpen}
          sx={{ color: '#5F6368' }}
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;