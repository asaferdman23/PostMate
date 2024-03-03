// components/NavBar.jsx
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import '.css/cmps/NavBar.css';

const NavBar = () => {
  return (
    <AppBar position="static" className="appBar">
      <Toolbar className="toolbar">
        <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
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
  );
};

export default NavBar;
