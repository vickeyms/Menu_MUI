import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, CssBaseline, Box,
} from '@mui/material';
import {
  Home as HomeIcon, Person as PersonIcon, Settings as SettingsIcon, ExpandLess, ExpandMore,
  MenuOpenOutlined
} from '@mui/icons-material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import srm from './srm.png';  // Logo for expanded view
import seal from './seal.png'; // Logo for collapsed view

const drawerWidth = 180;

const AppLayout = () => {
  const [open, setOpen] = useState(false);
  const [profileSubmenuOpen, setProfileSubmenuOpen] = useState(false); // State for profile submenu
  const location = useLocation(); // Get the current location to determine the selected menu item

  // Function to toggle the collapsed state
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Function to toggle the profile submenu
  const toggleProfileSubmenu = () => {
    setProfileSubmenuOpen(!profileSubmenuOpen);
  };

  // Function to determine if the menu item is selected
  const isSelected = (path) => location.pathname === path;

  const listItemSx = {
    borderRadius: '8px', // Rounded corners
    boxShadow: "2px",
    padding: '10px 16px', // Increased padding
    color: '#616161', // Default font color
    // border: '1px solid   #e0e0e0', // Add a light gray border
    marginBottom: '2px', // Add space between menu items
    '&:hover': {
      backgroundColor: '#edeef0', // Hover background color
      color: '#616161', // Hover font color
    },
    '& .MuiTypography-root': {
      fontWeight: '600', // Bold text
      fontSize: '1rem', // Slightly smaller font size for a sleek look
    },
  };

  const selectedItemSx = {
    backgroundColor: '#1976D2', // Highlighted background
    color: '#FFFFFF', // Highlighted text color
    '&:hover': {
      backgroundColor: '#7DC4FF', // Slightly darker hover for selected items
    },
  };

  const listItemIconSx = {
    minWidth: '35px', // Reduced icon spacing
    color: 'inherit', // Icon color to match the font
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />

      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#1976D2',
          width: open ? `calc(100% - ${drawerWidth}px)` : 'calc(100% - 64px)', // Adjust based on drawer state
          transition: 'width 0.3s ease', // Smooth transition for responsiveness
        }}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuOpenOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        sx={{
          width: open ? drawerWidth : '64px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : '64px',
            boxSizing: 'border-box',
            position: 'fixed', // Fix the drawer to the side
            height: '100vh', // Make it take the full height of the viewport
          },
        }}
        variant="permanent"
        open={open}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: open ? '10px 8px' : '8px' }}>
          <img
            src={open ? srm : seal}
            alt="Logo"
            style={{ maxHeight: open ? '40px' : '40px', width: 'auto' }}
          />
        </Box>

        {/* Menu Items */}
        <List>
          {/* Home */}
          <ListItem
            button
            component={Link}
            to="/"
            sx={{
              ...listItemSx,
              ...(isSelected('/') && selectedItemSx),
            }}
          >
            <ListItemIcon sx={listItemIconSx}> {/* Reduced icon spacing */}
              <HomeIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Home" />}
          </ListItem>

          {/* Profile (with submenu) */}
          <ListItem
            button
            onClick={toggleProfileSubmenu}
            sx={{
              ...listItemSx,
              ...(isSelected('/profile') && selectedItemSx),
            }}
          >
            <ListItemIcon sx={listItemIconSx}>
              <PersonIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Profile" />}
            {open && (profileSubmenuOpen ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>

          {/* Submenu for Profile */}
          <Collapse in={profileSubmenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={Link}
                to="/profile/view"
                sx={{
                  ...listItemSx,
                  ...(isSelected('/profile/view') && selectedItemSx),
                  paddingLeft: open ? 4 : 2, // Indentation for submenu items
                }}
              >
                <ListItemIcon sx={listItemIconSx}>
                  <PersonIcon />
                </ListItemIcon>
                {open && <ListItemText primary="View Profile" />}
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/profile/edit"
                sx={{
                  ...listItemSx,
                  ...(isSelected('/profile/edit') && selectedItemSx),
                  paddingLeft: open ? 4 : 2, // Indentation for submenu items
                }}
              >
                <ListItemIcon sx={listItemIconSx}>
                  <PersonIcon />
                </ListItemIcon>
                {open && <ListItemText primary="Edit Profile" />}
              </ListItem>
            </List>
          </Collapse>

          {/* Settings */}
          <ListItem
            button
            component={Link}
            to="/settings"
            sx={{
              ...listItemSx,
              ...(isSelected('/settings') && selectedItemSx),
            }}
          >
            <ListItemIcon sx={listItemIconSx}> {/* Reduced icon spacing */}
              <SettingsIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Settings" />}
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />

        {/* Gray gap between Navbar and Sidebar */}
        <Box
          sx={{
            backgroundColor: '#f5f5f5', // Very light gray background
            padding: '10px', // Some padding to create the gap
            height: 'calc(100vh - 64px)', // Full height minus the navbar
            boxSizing: 'border-box',
          }}
        >
          {/* White content area */}
          <Box
            sx={{
              backgroundColor: '#fff', // Pure white background
              borderRadius: '4px', // Rounded corners
              padding: 2, // Internal padding
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)', // Light shadow for the box
              minHeight: '100%', // Ensure it takes the full height
            }}
          >
            {/* Routed Components Rendered Here */}
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;