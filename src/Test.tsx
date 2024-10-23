import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Test: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);  // Drawer state

  // Function to toggle drawer open/close state
  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  // Contents of the Drawer
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {/* Button to toggle the drawer */}
      <IconButton
        onClick={toggleDrawer(true)}
        edge="start"
        color="inherit"
        aria-label="menu"
        style={{ position: 'absolute', top: '10px', left: '15px' }}
      >
        <MenuIcon />
      </IconButton>

      {/* Material-UI Drawer */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      {/* Main content for Test page */}
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Test Page</h1>
        <p>This is the test comp with drawer.</p>
      </div>
    </div>
  );
};

export default Test;
