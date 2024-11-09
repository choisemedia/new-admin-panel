import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Button
} from '@mui/material';
import { VerifiedUser } from '@mui/icons-material';

export const Verification = () => {
  const totalCustomers = 1;
  const targetCustomers = 1000;
  const totalOrders = 1;
  const targetOrders = 500;

  const customersProgress = (totalCustomers / targetCustomers) * 100;
  const ordersProgress = (totalOrders / targetOrders) * 100;

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <VerifiedUser sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Box>
            <Typography variant="h5">Get Your Badge</Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Get a badge for your store, you must have at least {targetCustomers} customers and at least {targetOrders} orders.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Total Customers</Typography>
            <Typography>{totalCustomers} / {targetCustomers}</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={customersProgress} 
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>Total Orders</Typography>
            <Typography>{totalOrders} / {targetOrders}</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={ordersProgress} 
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Buy Verification</Typography>
          <Typography variant="h6" color="primary">2000 ⭐</Typography>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>Invite Link</Typography>
          <Typography variant="body2" color="textSecondary">t.me/choise_app_bot</Typography>
        </Box>

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ mt: 2 }}
        >
          Share
        </Button>
      </CardContent>
    </Card>
  );
};