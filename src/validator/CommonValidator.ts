export const validateIsEmpty = (fieldValue: string, fieldTypeName: string) => {
  if (fieldValue === '')
    return `${fieldTypeName} can not be empty`;

  return '';
};