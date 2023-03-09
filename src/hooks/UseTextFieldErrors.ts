import { useCallback, useEffect, useMemo, useState } from 'react';

export const useTextFieldErrors = (initialFieldValue: string, validator: (value: string) => string, trimBeforeValidate = true) => {
  const [fieldValue, setFieldValue] = useState<string>(initialFieldValue);
  const [errors, setErrors] = useState<string>('');
  const hasErrors = useMemo(() => errors.length > 0, [errors]);

  const validate = useCallback(() => {
    setErrors(validator(trimBeforeValidate ? fieldValue.trim() : fieldValue));
  }, [fieldValue]);

  useEffect(() => {
    if (!hasErrors)
      return;
    validate();
  }, [hasErrors, validate]);

  return { fieldValue, setFieldValue, errors, validate, hasErrors, setErrors };
};