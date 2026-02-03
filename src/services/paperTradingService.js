// paperTradingService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const paperTradingService = {

  buyCrypto: async (userId, cryptoId, quantity) => {
    const response = await axios.post(
      `${API_BASE_URL}/paper/trade/buy`,
      { userId, cryptoId, quantity }
    );
    return response.data;
  },

  sellCrypto: async (userId, cryptoId, quantity) => {
    const response = await axios.post(
      `${API_BASE_URL}/paper/trade/sell`,
      { userId, cryptoId, quantity }
    );
    return response.data;
  },

  getPortfolio: async (userId) => {
    const response = await axios.get(
      `${API_BASE_URL}/paper/portfolio/${userId}`
    );
    return response.data;
  },

  getTransactions: async (userId) => {
    const response = await axios.get(
      `${API_BASE_URL}/paper/transactions/${userId}`
    );
    return response.data;
  },

  resetAccount: async (userId) => {
    const response = await axios.post(
      `${API_BASE_URL}/paper/account/reset/${userId}`
    );
    return response.data;
  },

  getAccountInfo: async (userId) => {
    const response = await axios.get(
      `${API_BASE_URL}/paper/account/${userId}`
    );
    return response.data;
  }
};
