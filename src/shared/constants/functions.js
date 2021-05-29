import { format, parseISO, isToday, isYesterday } from 'date-fns';
import CryptoJS from 'crypto-js';

CryptoJS.pad.NoPadding = {pad(){}, unpad(){}};

export const encryptAES = (secret) => 
  CryptoJS.AES.encrypt(JSON.stringify(secret), window.env.REACT_APP_MAGMA_AES_KEY).toString();

export const decryptAES = (secret) => {
  const decryptedSecret = CryptoJS.AES.decrypt(secret, window.env.REACT_APP_MAGMA_AES_KEY).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedSecret);
};

export const getDateFormatted = (date) => {
  const dateParsed = parseISO(date);

  if (isToday(dateParsed))
    return 'Hoje';

  if (isYesterday(dateParsed))
    return 'Ontem';
  
  return format(new Date(dateParsed), 'dd MMM, yyyy');
};

export const textInputErrorMessage = ({ input, min, max }) => {
  if (input && input.length < min)
    return `Tamanho mínimo de ${min} caracteres`;
  if (input && input?.length > max) 
    return `Tamanho máximo de ${max} caracteres`;

  return 'Preenchimento obrigatório';
};
