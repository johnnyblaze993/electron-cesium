// src/DrawerMenu.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import RoomIcon from '@mui/icons-material/Room';
import InboxIcon from '@mui/icons-material/Inbox';

const DrawerMenu: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);  // Drawer state
  const navigate = useNavigate();  // React Router's hook to navigate programmatically

  // Function to toggle drawer open/close state
  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  // Contents of the Drawer
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {/* Navigate to Test.tsx */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/test")}>
            <ListItemIcon>
              <InboxIcon />  {/* Icon for Test page */}
            </ListItemIcon>
            <ListItemText primary="Test Page" />
          </ListItemButton>
        </ListItem>

        {/* Navigate to AddCoordinate.tsx */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/add-coordinate")}>
            <ListItemIcon>
              <RoomIcon />  {/* Icon for Add Coordinates */}
            </ListItemIcon>
            <ListItemText primary="Add Coordinates" />
          </ListItemButton>
        </ListItem>
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
    </div>
  );
};

export default DrawerMenu;
