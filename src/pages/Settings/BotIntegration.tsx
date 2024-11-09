import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateBotSettings } from '../../store/slices/settingsSlice';
import { BotService } from '../../services/botService';

export const BotIntegration = () => {
  const dispatch = useDispatch();
  const botSettings = useSelector((state: RootState) => state.settings.bot);
  const products = useSelector((state: RootState) => state.products.items);
  const categories = useSelector((state: RootState) => state.categories.items);
  
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [loading, setLoading] = useState(false);
  const [webhookInfo, setWebhookInfo] = useState<any>(null);

  const handleUpdate = (field: string, value: any) => {
    dispatch(updateBotSettings({ [field]: value }));
  };

  const handleTestConnection = async () => {
    if (!botSettings.token) {
      setSnackbar({
        open: true,
        message: 'Please enter a bot token',
        severity: 'error'
      });
      return;
    }

    setLoading(true);
    try {
      const botService = new BotService(botSettings.token, botSettings.webhookUrl);
      
      // Test basic connection
      const botInfo = await botService.testConnection();
      
      // Set up webhook
      if (botSettings.webhookUrl) {
        await botService.setWebhook();
        const hookInfo = await botService.getWebhookInfo();
        setWebhookInfo(hookInfo.result);
      }

      // Set up commands
      await botService.setupShopCommands();
      
      // Send test message if support chat ID is provided
      if (botSettings.supportChatId) {
        await botService.sendShopProfile(botSettings.supportChatId, products, categories);
      }

      setSnackbar({
        open: true,
        message: `Bot @${botInfo.result.username} connected successfully!`,
        severity: 'success'
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.description || 'Failed to connect bot. Please check your credentials.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveWebhook = async () => {
    if (!botSettings.token) return;

    setLoading(true);
    try {
      const botService = new BotService(botSettings.token, '');
      await botService.deleteWebhook();
      setWebhookInfo(null);
      setSnackbar({
        open: true,
        message: 'Webhook removed successfully',
        severity: 'success'
      });
    } catch (error: any) {
      setSnackbar({
        open: true,
        message: error.response?.data?.description || 'Failed to remove webhook',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Bot Integration</Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>Telegram Bot Token</Typography>
          <TextField
            fullWidth
            value={botSettings.token}
            onChange={(e) => handleUpdate('token', e.target.value)}
            placeholder="Enter your bot token"
            type="password"
            sx={{ mb: 2 }}
            error={!botSettings.token}
            helperText={!botSettings.token ? 'Bot token is required' : ''}
          />
          <Typography variant="body2" color="text.secondary">
            You can get a bot token from @BotFather on Telegram
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>Webhook URL</Typography>
          <TextField
            fullWidth
            value={botSettings.webhookUrl}
            onChange={(e) => handleUpdate('webhookUrl', e.target.value)}
            placeholder="https://your-webhook-url.com"
            sx={{ mb: 2 }}
          />
          {webhookInfo && (
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="Webhook Status" 
                  secondary={webhookInfo.url ? 'Active' : 'Not set'}
                />
              </ListItem>
              {webhookInfo.url && (
                <ListItem>
                  <ListItemText 
                    primary="Current URL" 
                    secondary={webhookInfo.url}
                  />
                </ListItem>
              )}
            </List>
          )}
          {webhookInfo?.url && (
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleRemoveWebhook}
              disabled={loading}
            >
              Remove Webhook
            </Button>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>Notifications</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={botSettings.notifications.orders}
                onChange={(e) => handleUpdate('notifications', {
                  ...botSettings.notifications,
                  orders: e.target.checked
                })}
              />
            }
            label="Order notifications"
          />
          <FormControlLabel
            control={
              <Switch
                checked={botSettings.notifications.support}
                onChange={(e) => handleUpdate('notifications', {
                  ...botSettings.notifications,
                  support: e.target.checked
                })}
              />
            }
            label="Support messages"
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>Support Chat ID</Typography>
          <TextField
            fullWidth
            value={botSettings.supportChatId}
            onChange={(e) => handleUpdate('supportChatId', e.target.value)}
            placeholder="Enter chat ID for notifications"
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary">
            Forward a message from your chat to @RawDataBot to get your Chat ID
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>Auto-Reply Messages</Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={botSettings.autoReply.welcome}
            onChange={(e) => handleUpdate('autoReply', {
              ...botSettings.autoReply,
              welcome: e.target.value
            })}
            label="Welcome Message"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            value={botSettings.autoReply.orderConfirmation}
            onChange={(e) => handleUpdate('autoReply', {
              ...botSettings.autoReply,
              orderConfirmation: e.target.value
            })}
            label="Order Confirmation Message"
            sx={{ mb: 2 }}
          />
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            1. Create a new bot with @BotFather<br/>
            2. Copy the token and paste it here<br/>
            3. Set up your webhook URL (if using one)<br/>
            4. Test the connection<br/>
            5. Forward a message from your chat to @RawDataBot to get your Chat ID
          </Typography>
        </Alert>

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={handleTestConnection}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Connecting...' : 'Test Bot Connection'}
        </Button>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
        />
      </CardContent>
    </Card>
  );
};