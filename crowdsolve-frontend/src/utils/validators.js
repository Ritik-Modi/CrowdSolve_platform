// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  // At least 6 characters
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return null;
};

// Username validation
export const validateUsername = (username) => {
  if (username.length < 3) {
    return 'Username must be at least 3 characters long';
  }
  if (username.length > 20) {
    return 'Username must be less than 20 characters';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return null;
};

// Problem title validation
export const validateProblemTitle = (title) => {
  if (!title || title.trim().length === 0) {
    return 'Title is required';
  }
  if (title.length < 10) {
    return 'Title must be at least 10 characters long';
  }
  if (title.length > 200) {
    return 'Title must be less than 200 characters';
  }
  return null;
};

// Problem description validation
export const validateProblemDescription = (description) => {
  if (!description || description.trim().length === 0) {
    return 'Description is required';
  }
  if (description.length < 20) {
    return 'Description must be at least 20 characters long';
  }
  if (description.length > 5000) {
    return 'Description must be less than 5000 characters';
  }
  return null;
};

// Solution description validation
export const validateSolutionDescription = (description) => {
  if (!description || description.trim().length === 0) {
    return 'Solution description is required';
  }
  if (description.length < 10) {
    return 'Solution must be at least 10 characters long';
  }
  if (description.length > 3000) {
    return 'Solution must be less than 3000 characters';
  }
  return null;
};

// Comment validation
export const validateComment = (comment) => {
  if (!comment || comment.trim().length === 0) {
    return 'Comment cannot be empty';
  }
  if (comment.length > 500) {
    return 'Comment must be less than 500 characters';
  }
  return null;
};