export const filterIndexedEnumsKeys = (obj) => {
  return Object.keys(obj).filter((currentKey) => isNaN(parseInt(currentKey)));
};

export const findEnumKeyWithValue = (value, obj) =>{
  const validEnumKeys = filterIndexedEnumsKeys(obj);

  return validEnumKeys.find(enumKey => obj[enumKey] === value);
};

export const dateIsBefore = (date: Date, dateToCompareTo: Date) => {
  return date <= dateToCompareTo;
};

export const initialDateTime = (date: string) => {
  const currentDateTime = new Date();
  if (date === 'end') currentDateTime.setHours(currentDateTime.getHours() + 2);
  else currentDateTime.setHours(currentDateTime.getHours() + 1);

  return currentDateTime;
};