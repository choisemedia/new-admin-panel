import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Divider
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateCustomerFields, setMinimalPrice, updateCheckoutMessage } from '../../store/slices/settingsSlice';

export const CustomerFields = () => {
  const dispatch = useDispatch();
  const { customerFields, minimalPrice, checkoutMessage } = useSelector((state: RootState) => state.settings);

  const handleFieldToggle = (field: string) => {
    dispatch(updateCustomerFields({ [field]: !customerFields[field as keyof typeof customerFields] }));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Customer Information</Typography>
        
        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={<Switch checked={customerFields.name} onChange={() => handleFieldToggle('name')} />}
            label="Name"
          />
          <FormControlLabel
            control={<Switch checked={customerFields.contactNumber} onChange={() => handleFieldToggle('contactNumber')} />}
            label="Contact Number"
          />
          <FormControlLabel
            control={<Switch checked={customerFields.email} onChange={() => handleFieldToggle('email')} />}
            label="Email"
          />
          <FormControlLabel
            control={<Switch checked={customerFields.username} onChange={() => handleFieldToggle('username')} />}
            label="Username"
          />
          <FormControlLabel
            control={<Switch checked={customerFields.location} onChange={() => handleFieldToggle('location')} />}
            label="Location"
          />
          <FormControlLabel
            control={<Switch checked={customerFields.comment} onChange={() => handleFieldToggle('comment')} />}
            label="Comment"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>Minimal Price</Typography>
        <TextField
          type="number"
          value={minimalPrice}
          onChange={(e) => dispatch(setMinimalPrice(Number(e.target.value)))}
          fullWidth
          label="Minimal Order Price"
          sx={{ mb: 3 }}
        />

        <Typography variant="h6" gutterBottom>Checkout Message</Typography>
        <TextField
          multiline
          rows={4}
          value={checkoutMessage.en}
          onChange={(e) => dispatch(updateCheckoutMessage({ lang: 'en', message: e.target.value }))}
          fullWidth
          label="English Message"
          sx={{ mb: 2 }}
        />
        <TextField
          multiline
          rows={4}
          value={checkoutMessage.ru}
          onChange={(e) => dispatch(updateCheckoutMessage({ lang: 'ru', message: e.target.value }))}
          fullWidth
          label="Russian Message"
        />
      </CardContent>
    </Card>
  );
};