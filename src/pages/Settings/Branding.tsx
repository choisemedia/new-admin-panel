import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateBranding } from '../../store/slices/settingsSlice';

export const Branding = () => {
  const dispatch = useDispatch();
  const branding = useSelector((state: RootState) => state.settings.branding);

  const handleUpdate = (field: 'text' | 'link', value: string) => {
    dispatch(updateBranding({ ...branding, [field]: value }));
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">Custom Branding</Typography>
        </Box>
        
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Permanently remove the "Powered by Sellz" watermark from your store.
        </Typography>

        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Text"
            value={branding.text}
            onChange={(e) => handleUpdate('text', e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Link"
            value={branding.link}
            onChange={(e) => handleUpdate('link', e.target.value)}
            sx={{ mb: 3 }}
          />
        </Box>

        <Typography variant="h6" color="primary" gutterBottom>
          2500 ⭐
        </Typography>

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ mt: 2 }}
        >
          Remove
        </Button>
      </CardContent>
    </Card>
  );
};