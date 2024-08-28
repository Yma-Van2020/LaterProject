import validator from 'validator';

export const validateURL = (url: string) => {
  return validator.isURL(url);
};

export const validateParameters = (parameters: any) => {
  return typeof parameters === 'object' && parameters !== null;
};
