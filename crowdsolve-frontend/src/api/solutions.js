import axiosInstance from './axios';
import { API_ENDPOINTS } from '../utils/constants';

export const solutionsAPI = {
  // Create solution
  create: async (solutionData) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.SOLUTIONS.CREATE,
      solutionData
    );
    return response.data;
  },

  // Update solution
  update: async (id, solutionData) => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.SOLUTIONS.UPDATE(id),
      solutionData
    );
    return response.data;
  },

  // Delete solution
  delete: async (id) => {
    const response = await axiosInstance.delete(
      API_ENDPOINTS.SOLUTIONS.DELETE(id)
    );
    return response.data;
  },

  // Upvote solution
  upvote: async (id) => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.SOLUTIONS.UPVOTE(id)
    );
    return response.data;
  },

  // Add comment to solution
  addComment: async (id, commentData) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.SOLUTIONS.COMMENT(id),
      commentData
    );
    return response.data;
  }
};

export default solutionsAPI;