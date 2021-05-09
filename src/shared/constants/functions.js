import { format, parseISO, isToday, isYesterday } from 'date-fns';

export const getDateFormatted = (date) => {
  const dateParsed = parseISO(date);

  if (isToday(dateParsed))
    return 'Hoje';

  if (isYesterday(dateParsed))
    return 'Ontem';
  
  return format(new Date(dateParsed), 'dd MMM, yyyy');
};

export const textInputErrorMessage = ({ input, min, max }) => {
  if (input?.length < min)
    return `Tamanho mínimo de ${min} caracteres`;
  if (input?.length > max) 
    return `Tamanho máximo de ${max} caracteres`;

  return 'Preenchimento obrigatório';
};
