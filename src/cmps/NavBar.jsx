import List from '@mui/material/List';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import ListItemButton from '@mui/material/ListItemButton'; // Import ListItemButton
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import DraftsIcon from '@mui/icons-material/Drafts';
import SnoozeIcon from '@mui/icons-material/Snooze';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

import styled from 'styled-components';

import "../assets/css/cmps/list-nav-bar.css"
const StyledButton = styled(Button)`
&:hover {
  background-color: white;
}
`;
function NavBar({ expanded }) {
  
  const navBarClass = expanded ? "list-nav-bar expanded" : "list-nav-bar collapsed";
  const [isHovered, setIsHovered] = useState(false);


  return (
    <section className={navBarClass}>
        <div className='list-nav-bar-container'>
          <div className='compose-button-container'>
            {/* Compose button */}
            <Link to="/compose" style={{ textDecoration: 'none' }}> {/* Adjust the link to your compose path */}
                <StyledButton
                  className={clsx('list-compose-button', { 'list-compose-button-collapsed': expanded })}
                  variant="contained"
                  startIcon={<CreateIcon />}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    fontWeight: '500',
                    width: '118.452px',
                    height: '55.9943px',
                    lineHeight: '32px',
                    marginRight: '0px',
                    minWidth: '96px',
                    paddingBottom: '0px',
                    paddingLeft: '0px',
                    paddingRight: '24px',
                    paddingTop: '0px',
                    textAlign: 'center',
                    letterSpacing: 'normal',
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    borderBottomStyle:'none',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    borderTopWidth:'0px',
                    borderBottomWidth:'0px',
                    borderImageRepeat:'stretch',
                    backgroundColor: 'rgb(194, 231, 255)',
                    color: 'rgb(0, 29, 53)',
                    ':hover': {
                      backgroundColor: 'white',
                    },
                    textTransform: 'none', 
                    boxShadow:'rgba(0, 0, 0, 0) 0px 1px 2px 0px, rgba(0, 0, 0, 0) 0px 1p',
                  }}
                >
                {(expanded || isHovered) && "Compose" }
                </StyledButton>
              </Link>
            </div>
          <List>
             
            {/* Snoozed link */}
            {/* Inbox link */}
            <Link to="/inbox">
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItemButton>
            </Link>

            {/* Starred link */}
            <Link to="/starred">
              <ListItemButton>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
            </Link>

            {/* Drafts link */}
            <Link to="/sent">
              <ListItemButton>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Sent" />
              </ListItemButton>
            </Link>
            <Link to="/drafts">
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="Drafts" />
              </ListItemButton>
            </Link>
            <Link to="/trash">
              <ListItemButton>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Trash" />
              </ListItemButton>
            </Link>
          </List>
      </div>
    </section> 
  );
}

export default NavBar;
