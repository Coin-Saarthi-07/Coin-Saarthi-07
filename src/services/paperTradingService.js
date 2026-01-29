// paperTradingService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Update with your backend URL

export const paperTradingService = {
  // Buy crypto
  buyCrypto: async (userId, cryptoId, quantity) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/paper/trade/buy`, null, {
        params: {
          userId,
          cryptoId,
          quantity
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Sell crypto
  sellCrypto: async (userId, cryptoId, quantity) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/paper/trade/sell`, null, {
        params: {
          userId,
          cryptoId,
          quantity
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get portfolio
  getPortfolio: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/paper/portfolio/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get transactions
  getTransactions: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/paper/transactions/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Reset account
  resetAccount: async (userId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/paper/account/reset/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get account info
  getAccountInfo: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/paper/account/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};