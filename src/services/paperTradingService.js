// paperTradingService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';
const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});
export const paperTradingService = {

  // buyCrypto: async (userId, cryptoId, quantity) => {
  //   const response = await axios.post(
  //     `${API_BASE_URL}/paper/trade/buy`,
  //     { userId, cryptoId, quantity }
  //   );
  //   return response.data;
  // },
  buyCrypto: async (userId, cryptoId, quantity) => {
  const response = await axios.post(
    `${API_BASE_URL}/paper/trade/buy`,
    null, // ✅ body must be null
    {
      params: {
        userId,
        cryptoId,
        quantity: quantity.toString(), // BigDecimal safe
      },
      headers: authHeader(),
    }
  );
  return response.data;
},

  // sellCrypto: async (userId, cryptoId, quantity) => {
  //   const response = await axios.post(
  //     `${API_BASE_URL}/paper/trade/sell`,
  //     { userId, cryptoId, quantity }
  //   );
  //   return response.data;
  // },
  sellCrypto: async (userId, cryptoId, quantity) => {
  const response = await axios.post(
    `${API_BASE_URL}/paper/trade/sell`,
    null,
    {
      params: {
        userId,
        cryptoId,
        quantity: quantity.toString(),
      },
      headers: authHeader(),
    }
  );
  return response.data;
},


  // getPortfolio: async (userId) => {
  //   const response = await axios.get(
  //     `${API_BASE_URL}/paper/portfolio/${userId}`
  //   );
  //   return response.data;
  // },
  getPortfolio: async (userId) => {
  const response = await axios.get(
    `${API_BASE_URL}/paper/portfolio/${userId}`,
    {
      headers: authHeader(), 
    }
  );
  return response.data;
},


  getTransactions: async (userId) => {
    const response = await axios.get(
      `${API_BASE_URL}/paper/transactions/${userId}`,
    {
      headers: authHeader(), 
    }
    );
    return response.data;
  },

  // resetAccount: async (userId) => {
  //   const response = await axios.post(
  //     `${API_BASE_URL}/paper/account/reset/${userId}`
  //   );
  //   return response.data;
  // },

  getAccountInfo: async (userId) => {
    const response = await axios.get(
      `${API_BASE_URL}/paper/account/${userId}`,
      {
      headers: authHeader(), 
    }
    );
    return response.data;
  }
};
