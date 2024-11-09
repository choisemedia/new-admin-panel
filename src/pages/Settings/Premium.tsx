import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Mail,
  Lock,
  Category,
  ShoppingCart,
  Star,
  VideoLibrary
} from '@mui/icons-material';

const features = [
  {
    icon: <Mail />,
    title: 'Mailing',
    description: 'Direct communication with your customers through mailing, increasing loyalty and sales.'
  },
  {
    icon: <Lock />,
    title: 'Subscribe To Channel',
    description: 'To open store, the user will need to subscribe to the channel to see your content.'
  },
  {
    icon: <ShoppingCart />,
    title: 'Products',
    description: 'Expand your assortment up to 500 products and offer your customers more choices.'
  },
  {
    icon: <Category />,
    title: 'Categories',
    description: 'Organize your assortment into up to 50 categories for better convenience and navigation.'
  },
  {
    icon: <Star />,
    title: 'Featured Products',
    description: 'Highlight the uniqueness of your best products by featuring them as Top.'
  },
  {
    icon: <VideoLibrary />,
    title: 'Product Video',
    description: 'Upload videos that showcase your products and engage customers.'
  }
];

export const Premium = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Sellz Premium</Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Break free from limitations and unlock exclusive features by subscribing to premium
        </Typography>

        <Box sx={{ my: 3 }}>
          <RadioGroup defaultValue="3months">
            <FormControlLabel 
              value="3months" 
              control={<Radio />} 
              label={
                <Box>
                  <Typography variant="subtitle1">3 Months</Typography>
                  <Typography variant="body2" color="primary">1200 ⭐</Typography>
                </Box>
              }
            />
            <FormControlLabel 
              value="1month" 
              control={<Radio />} 
              label={
                <Box>
                  <Typography variant="subtitle1">1 Month</Typography>
                  <Typography variant="body2" color="primary">500 ⭐</Typography>
                </Box>
              }
            />
          </RadioGroup>
        </Box>

        <Typography variant="h6" gutterBottom>What's Included</Typography>
        <List>
          {features.map((feature) => (
            <ListItem key={feature.title}>
              <ListItemIcon>{feature.icon}</ListItemIcon>
              <ListItemText 
                primary={feature.title}
                secondary={feature.description}
              />
            </ListItem>
          ))}
        </List>

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          size="large"
          sx={{ mt: 2 }}
        >
          Upgrade to Premium
        </Button>
      </CardContent>
    </Card>
  );
};