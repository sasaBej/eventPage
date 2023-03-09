import { dateIsBefore } from '../utils/ObjectUtils';
import { isBetween } from '../utils/StringUtils';
import { validateIsEmpty } from './CommonValidator';

const eventNameRegex = new RegExp('^[a-zA-Z\\d\\s]*$');
const descriptionRegex = new RegExp('^[a-zA-Z\\d\\-\\s\\.\\,]*$');
const capacityRegex = new RegExp('^[1-9][0-9]{0,5}$');

export const validateName = (name: string) => {
  if (!(isBetween(name, 2, 100) && name.match(eventNameRegex))) {
    return 'Name should have between 2 and 100 alphanumeric characters, including " "';
  }

  return '';
};

export const validateDescription = (description: string) => {
  if (!description.match(descriptionRegex)) {
    return 'Description should not have more than 2000 alphanumeric characters, including " " and "-"';
  }

  return '';
};

export const validateCapacity = (capacity: string) => {
  if (!capacity.match(capacityRegex) || parseInt(capacity) > 100000) {
    return 'Capacity should be a number between 1 and 100.000';
  }

  return '';
};

export const validateEventType = (eventType: string) => validateIsEmpty(eventType, 'Event type');

export const validateCity = (city: string) => validateIsEmpty(city, 'City');

export const validateCountry = (country: string) => validateIsEmpty(country, 'Country');

export const validateLocation = (location: string) => {
  if (!(isBetween(location.trim(), 10, 50))) {
    return 'Location should have between 10 and 50 characters';
  }

  return '';
};

export const validateDate = (date: Date) => {
  if (date.toISOString() == null)
    return 'Date is invalid';

  if (dateIsBefore(date, new Date()))
    return 'Date can not be before the current date';

  return '';
};

export const validateStartAndEndDate = (startDate: Date, endDate: Date) => {
  if (endDate <= startDate)
    return 'End date can not be before start date';

  return '';
};

export const validateImage = (image: File) => {
  if (image.name.length > 100) {
    return 'Image name should have maximum 100 characters';
  }
  if (image.type != 'image/png' && image.type != 'image/jpg' && image.type != 'image/jpeg') {
    return 'Image should be .png/.jpg/.jpeg';
  }
  if (image.size > 1048576) {
    return 'Image should have less than 1MB';
  }

  return '';
};