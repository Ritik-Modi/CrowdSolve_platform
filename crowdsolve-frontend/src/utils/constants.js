export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4100/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
  },
  PROBLEMS: {
    GET_ALL: '/problems',
    GET_ONE: (id) => `/problems/${id}`,
    CREATE: '/problems',
    UPDATE: (id) => `/problems/${id}`,
    DELETE: (id) => `/problems/${id}`,
    GET_SOLUTIONS: (id) => `/problems/${id}/solutions`,
  },
  SOLUTIONS: {
    CREATE: '/solutions',
    UPDATE: (id) => `/solutions/${id}`,
    DELETE: (id) => `/solutions/${id}`,
    UPVOTE: (id) => `/solutions/${id}/upvote`,
    COMMENT: (id) => `/solutions/${id}/comment`,
  },
  USERS: {
    GET_DETAILS: (id) => `/users/${id}`,
    GET_PROBLEMS: (id) => `/users/${id}/problems`,
    GET_SOLUTIONS: (id) => `/users/${id}/solutions`,
  },
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROBLEMS: '/problems',
  PROBLEM_DETAIL: '/problems/:id',
  CREATE_PROBLEM: '/problems/create',
  PROFILE: '/profile/:id',
  NOT_FOUND: '*',
};