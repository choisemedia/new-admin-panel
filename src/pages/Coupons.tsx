import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const Coupons = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Coupons</Typography>
      <Card>
        <CardContent>
          <Typography>
            Coupon management will be available in the next update.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Coupons;