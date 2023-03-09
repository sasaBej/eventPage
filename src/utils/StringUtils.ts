export const isBetween = (fieldValue: string, min: number, max: number) => fieldValue.length >= min && fieldValue.length <= max;

export const isNullOrUndefined = (fieldValue: string) => fieldValue === null || typeof (fieldValue) === undefined;

export const isEmptyString = (value: string) => isNullOrUndefined(value) || value.length === 0;
