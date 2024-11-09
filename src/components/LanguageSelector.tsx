import React from 'react';
import { 
  FormControl, 
  Select, 
  MenuItem, 
  SelectChangeEvent,
  Typography,
  Box
} from '@mui/material';
import { useTranslation } from 'react-i18next';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Interface Language
      </Typography>
      <FormControl fullWidth>
        <Select
          value={i18n.language}
          onChange={handleChange}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ru">Русский</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};