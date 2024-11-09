import axios from 'axios';
import { Product, Category, Order } from '../types';

const TELEGRAM_API = 'https://api.telegram.org/bot';

export class BotService {
  private token: string;
  private webhookUrl: string;

  constructor(token: string, webhookUrl: string) {
    this.token = token;
    this.webhookUrl = webhookUrl;
  }

  private async makeRequest(method: string, data?: any) {
    try {
      const response = await axios.post(`${TELEGRAM_API}${this.token}/${method}`, data);
      return response.data;
    } catch (error: any) {
      console.error(`Error in ${method}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async setWebhook() {
    return this.makeRequest('setWebhook', {
      url: this.webhookUrl,
      allowed_updates: ['message', 'callback_query', 'inline_query', 'pre_checkout_query', 'shipping_query'],
      drop_pending_updates: true
    });
  }

  async deleteWebhook() {
    return this.makeRequest('deleteWebhook', {
      drop_pending_updates: true
    });
  }

  async getWebhookInfo() {
    return this.makeRequest('getWebhookInfo');
  }

  async sendShopProfile(chatId: string, products: Product[], categories: Category[]) {
    try {
      // Send welcome message with inline keyboard
      await this.makeRequest('sendMessage', {
        chat_id: chatId,
        parse_mode: 'HTML',
        text: '🏪 <b>Welcome to Your Shop!</b>\nChoose a category to view products:',
        reply_markup: {
          inline_keyboard: [
            ...categories.map(category => ([{
              text: category.name,
              callback_data: `category_${category.id}`
            }])),
            [{
              text: '🛒 Shopping Cart',
              callback_data: 'cart'
            }]
          ]
        }
      });
    } catch (error) {
      console.error('Error sending shop profile:', error);
      throw error;
    }
  }

  async sendProductsByCategory(chatId: string, categoryId: string, products: Product[]) {
    const categoryProducts = products.filter(p => p.category === categoryId);
    
    if (categoryProducts.length === 0) {
      await this.makeRequest('sendMessage', {
        chat_id: chatId,
        text: 'No products found in this category.'
      });
      return;
    }

    for (const product of categoryProducts) {
      await this.makeRequest('sendPhoto', {
        chat_id: chatId,
        photo: product.image,
        caption: `<b>${product.name}</b>\n💫 ${product.price}⭐\n\n${product.description || ''}`,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [[
            {
              text: '🛒 Add to Cart',
              callback_data: `add_to_cart_${product.id}`
            }
          ]]
        }
      });
    }
  }

  async sendOrder(chatId: string, order: Order) {
    const message = `🛍 <b>New Order #${order.id}</b>\n\n` +
      `Total Amount: ${order.totalAmount}⭐\n` +
      `Status: ${order.status}\n` +
      `Payment Status: ${order.paymentStatus}\n\n` +
      `Products:\n${order.products.map(p => 
        `- ${p.quantity}x ${p.productId} (${p.price}⭐)`
      ).join('\n')}`;

    await this.makeRequest('sendMessage', {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [[
          {
            text: '✅ Accept',
            callback_data: `order_accept_${order.id}`
          },
          {
            text: '❌ Reject',
            callback_data: `order_reject_${order.id}`
          }
        ]]
      }
    });
  }

  async setupShopCommands() {
    const commands = [
      {
        command: 'start',
        description: 'Open shop'
      },
      {
        command: 'categories',
        description: 'View product categories'
      },
      {
        command: 'cart',
        description: 'View shopping cart'
      },
      {
        command: 'orders',
        description: 'View your orders'
      },
      {
        command: 'help',
        description: 'Get help'
      }
    ];

    return this.makeRequest('setMyCommands', { commands });
  }

  async testConnection() {
    try {
      const response = await axios.get(`${TELEGRAM_API}${this.token}/getMe`);
      return response.data;
    } catch (error) {
      console.error('Error testing bot connection:', error);
      throw error;
    }
  }

  async sendNotification(chatId: string, message: string) {
    return this.makeRequest('sendMessage', {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
  }
}