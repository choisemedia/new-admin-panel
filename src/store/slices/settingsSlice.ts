import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  premium: boolean;
  verification: boolean;
  branding: {
    text: string;
    link: string;
  };
  language: 'en' | 'ru';
  customerFields: {
    name: boolean;
    contactNumber: boolean;
    email: boolean;
    username: boolean;
    location: boolean;
    comment: boolean;
  };
  minimalPrice: number;
  checkoutMessage: {
    ru: string;
    en: string;
  };
  orderForwarding: {
    chatId: string;
  };
  bot: {
    token: string;
    webhookUrl: string;
    notifications: {
      orders: boolean;
      support: boolean;
    };
    supportChatId: string;
    autoReply: {
      welcome: string;
      orderConfirmation: string;
    };
  };
}

const initialState: SettingsState = {
  premium: false,
  verification: false,
  branding: {
    text: '',
    link: '',
  },
  language: 'en',
  customerFields: {
    name: true,
    contactNumber: true,
    email: false,
    username: false,
    location: false,
    comment: false,
  },
  minimalPrice: 0,
  checkoutMessage: {
    ru: 'Спасибо за оформление заказа! Ваш заказ принят, и мы свяжемся с вами в ближайшее время.',
    en: 'Thank you for your order! We will contact you shortly.',
  },
  orderForwarding: {
    chatId: '',
  },
  bot: {
    token: '',
    webhookUrl: '',
    notifications: {
      orders: true,
      support: true,
    },
    supportChatId: '',
    autoReply: {
      welcome: 'Welcome to our shop! How can we help you today?',
      orderConfirmation: 'Thank you for your order! We will process it shortly.',
    },
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    togglePremium: (state) => {
      state.premium = !state.premium;
    },
    toggleVerification: (state) => {
      state.verification = !state.verification;
    },
    updateBranding: (state, action: PayloadAction<{text: string; link: string}>) => {
      state.branding = action.payload;
    },
    setLanguage: (state, action: PayloadAction<'en' | 'ru'>) => {
      state.language = action.payload;
    },
    updateCustomerFields: (state, action: PayloadAction<Partial<SettingsState['customerFields']>>) => {
      state.customerFields = { ...state.customerFields, ...action.payload };
    },
    setMinimalPrice: (state, action: PayloadAction<number>) => {
      state.minimalPrice = action.payload;
    },
    updateCheckoutMessage: (state, action: PayloadAction<{lang: 'en' | 'ru'; message: string}>) => {
      state.checkoutMessage[action.payload.lang] = action.payload.message;
    },
    setOrderForwarding: (state, action: PayloadAction<string>) => {
      state.orderForwarding.chatId = action.payload;
    },
    updateBotSettings: (state, action: PayloadAction<Partial<SettingsState['bot']>>) => {
      state.bot = { ...state.bot, ...action.payload };
    },
  },
});

export const {
  togglePremium,
  toggleVerification,
  updateBranding,
  setLanguage,
  updateCustomerFields,
  setMinimalPrice,
  updateCheckoutMessage,
  setOrderForwarding,
  updateBotSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;