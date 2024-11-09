import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Typography,
  Paper,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { togglePaymentMethod } from '../store/slices/paymentsSlice';

export const PaymentMethods: React.FC = () => {
  const dispatch = useDispatch();
  const paymentMethods = useSelector((state: RootState) => state.payments.methods);

  const handleToggle = (id: string) => {
    dispatch(togglePaymentMethod(id));
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Payment Methods
      </Typography>
      <List>
        {paymentMethods.map((method) => (
          <ListItem key={method.id}>
            <ListItemText 
              primary={method.name}
              secondary={`Type: ${method.type}`}
            />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={() => handleToggle(method.id)}
                checked={method.isActive}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};