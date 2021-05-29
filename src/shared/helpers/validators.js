import { string } from 'yup';

export const validateEmail = (e) => {
  try {
    return !!string().email().validateSync(e);
  } catch (error) {
    return false;
  }
};

