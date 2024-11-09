import React from 'react';
import { Box, Typography } from '@mui/material';
import { PaymentMethods } from '../components/PaymentMethods';

const Payments: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payment Settings
      </Typography>
      <PaymentMethods />
    </Box>
  );
};

export default Payments;