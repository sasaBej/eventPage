import { useCallback, useEffect, useMemo, useState } from 'react';
import { validateStartAndEndDate } from '../validator/EventValidator';

export const useTimeErrors = (initialStartDateValue: Date, initialEndDateValue:Date, validatorStartValue: (startDateValue: Date)=> string, validatorEndValue: (startDateValue: Date)=> string)=>{
  const [startDateValue, setStartDateValue] = useState<Date>(initialStartDateValue);
  const [endDateValue, setEndDateValue] = useState<Date>(initialEndDateValue);
  const [errorsStartDate, setErrorsStartDate] = useState<string>('');
  const [errorsEndDate, setErrorsEndDate] = useState<string>('');
  const hasErrorsStartDate = useMemo(()=> errorsStartDate.length > 0, [errorsStartDate]);
  const hasErrorsEndDate = useMemo(()=> errorsEndDate.length >0 , [errorsEndDate]);

  const validateStartTime = useCallback(() => {
    setErrorsStartDate(validatorStartValue(startDateValue));
  },[startDateValue]);

  const validateEndTime = useCallback(() => {
    setErrorsEndDate(validatorEndValue(endDateValue) || validateStartAndEndDate(startDateValue, endDateValue));
  },[startDateValue, endDateValue]);


  useEffect(() => {
    validateStartTime();
    validateEndTime();
  },[validateStartTime, validateEndTime]);

  return { startDateValue, setStartDateValue, endDateValue, setEndDateValue, errorsStartDate, validateStartTime,validateEndTime, hasErrorsStartDate, hasErrorsEndDate, errorsEndDate };
};