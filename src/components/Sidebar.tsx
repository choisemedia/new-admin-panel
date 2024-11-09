import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Box
} from '@mui/material';
import {
  Dashboard,
  Category,
  ShoppingCart,
  People,
  Settings,
  Payment,
  LocalOffer,
  Analytics
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Products', icon: <ShoppingCart />, path: '/products' },
  { text: 'Categories', icon: <Category />, path: '/categories' },
  { text: 'Customers', icon: <People />, path: '/customers' },
  { text: 'Orders', icon: <ShoppingCart />, path: '/orders' },
  { text: 'Payments', icon: <Payment />, path: '/payments' },
  { text: 'Coupons', icon: <LocalOffer />, path: '/coupons' },
  { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Shop Admin</Typography>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};