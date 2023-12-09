export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValidEmail = regex.test(email);
  return isValidEmail;
};

export const isEmpty = (value) => !value?.toString()?.trim()?.length > 0;
