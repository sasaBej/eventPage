import { isBetween } from '../utils/StringUtils';

const nameRegex = new RegExp('^[a-zA-Z\\d\\-\\s]*$');
const emailRegex = new RegExp('^\\w+@\\w+\\.[Cc][Oo][Mm]$');
const companyRegex = new RegExp('^[a-zA-Z0-9]+$');
const passwordRegex = new RegExp('^[^\\s]+$');

export const handleValidationFirstName = (fieldValue: string) => {
  if (fieldValue === '')
    return 'Field is required';
  if (!(isBetween(fieldValue, 2, 100) && fieldValue.match(nameRegex))) {
    return 'First Name should have between 2 and 100 alpha characters, including "-" and " "';
  }

  return '';
};

export const handleValidationLastName = (fieldValue: string) => {
  if (fieldValue === '')
    return 'Field is required';
  if (!(isBetween(fieldValue, 2, 100) && fieldValue.match(nameRegex))) {
    return 'Last Name should have between 2 and 100 alpha characters, including "-" and " "';
  }

  return '';
};

export const handleValidationEmail = (fieldValue: string) => {
  if (fieldValue === '')
    return 'Field is required';
  if (!(isBetween(fieldValue, 7, 74) && fieldValue.match(emailRegex))) {
    return ('Email should have a valid format {alphanumeric and underline}@{string}.com and should have between 7 and 74 characters');
  }

  return ('');
};

export const handleValidationCompany = (fieldValue: string) => {
  if (fieldValue === '')
    return 'Field is required';
  if (!(isBetween(fieldValue, 2, 100) && fieldValue.match(companyRegex))) {
    return 'Company should have between 2 and 100 alphanumeric characters';
  }

  return '';
};

export const handleValidationPassword = (fieldValue: string) => {
  if (fieldValue === '')
    return 'Field is required';
  if (!(isBetween(fieldValue, 2, 20) && fieldValue.match(passwordRegex))) {
    return 'Password should have between 2 and 20 characters, excluding white space';
  }

  return '';
};