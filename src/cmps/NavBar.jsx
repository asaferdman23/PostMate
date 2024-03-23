import List from '@mui/material/List';
import { Link } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton'; // Import ListItemButton
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import DraftsIcon from '@mui/icons-material/Drafts';
import SnoozeIcon from '@mui/icons-material/Snooze';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

import "../assets/css/cmps/list-nav-bar.css"

function NavBar({ expanded }) {
  const navBarClass = expanded ? "list-nav-bar expanded" : "list-nav-bar collapsed";

  return (
    <section className={navBarClass}>
        <div className='list-nav-bar-container'>
            <List>
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
