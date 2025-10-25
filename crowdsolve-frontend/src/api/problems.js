import axiosInstance from './axios';
import { API_ENDPOINTS } from '../utils/constants';

export const problemsAPI = {
  // Get all problems
  getAll: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.PROBLEMS.GET_ALL);
    return response.data;
  },

  // Get single problem
  getOne: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.PROBLEMS.GET_ONE(id));
    return response.data;
  },

  // Create problem
  create: async (problemData) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.PROBLEMS.CREATE,
      problemData
    );
    return response.data;
  },

  // Update problem
  update: async (id, problemData) => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.PROBLEMS.UPDATE(id),
      problemData
    );
    return response.data;
  },

  // Delete problem
  delete: async (id) => {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.PROBLEMS.DELETE(id)
    );
    return response.data;
  },

  // Get solutions for a problem
  getSolutions: async (id) => {
    const response = await axiosInstance.get(
      API_ENDPOINTS.PROBLEMS.GET_SOLUTIONS(id)
    );
    return response.data;
  }
};

export default problemsAPI;