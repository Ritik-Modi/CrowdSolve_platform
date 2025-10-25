import axiosInstance from './axios';
import { API_ENDPOINTS } from '../utils/constants';

export const authAPI = {
  // Login
  login: async (email, password) => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password
    });
    return response.data;
  },

  // Signup
  signup: async (username, email, password) => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.SIGNUP, {
      username,
      email,
      password
    });
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  }
};

export default authAPI;