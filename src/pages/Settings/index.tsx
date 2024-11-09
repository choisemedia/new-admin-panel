import React from 'react';
import { Grid } from '@mui/material';
import { Premium } from './Premium';
import { Verification } from './Verification';
import { Branding } from './Branding';
import { CustomerFields } from './CustomerFields';
import { BotIntegration } from './BotIntegration';

const Settings = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Premium />
      </Grid>
      <Grid item xs={12} md={6}>
        <Verification />
      </Grid>
      <Grid item xs={12} md={6}>
        <Branding />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomerFields />
      </Grid>
      <Grid item xs={12}>
        <BotIntegration />
      </Grid>
    </Grid>
  );
};

export default Settings;