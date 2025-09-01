// utils/validators.js

// Email validation regex
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Strong password validation (min 8 chars, 1 uppercase, 1 number, 1 special char)
export const isStrongPassword = (password) => {
  const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

// Name validation (only letters + spaces, min 3 chars)
export const isValidName = (name) => {
  const re = /^[A-Za-z ]{3,}$/;
  return re.test(name);
};
