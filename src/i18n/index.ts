import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'dashboard': 'Dashboard',
      'products': 'Products',
      'categories': 'Categories',
      'customers': 'Customers',
      'orders': 'Orders',
      'payments': 'Payments',
      'settings': 'Settings',
      'addProduct': 'Add Product',
      'addCategory': 'Add Category',
    }
  },
  ru: {
    translation: {
      'dashboard': 'Панель управления',
      'products': 'Товары',
      'categories': 'Категории',
      'customers': 'Клиенты',
      'orders': 'Заказы',
      'payments': 'Платежи',
      'settings': 'Настройки',
      'addProduct': 'Добавить товар',
      'addCategory': 'Добавить категорию',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;