import { Box, MenuItem } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import ApiService from '../../../api/ApiService';
import { useTextFieldErrors } from '../../../hooks/UseTextFieldErrors';
import { EventType } from '../../../types/EventType';
import { filterIndexedEnumsKeys, initialDateTime } from '../../../utils/ObjectUtils';
import {
  validateCapacity,
  validateCity,
  validateCountry,
  validateDate,
  validateDescription,
  validateEventType,
  validateLocation,
  validateName,
  validateImage
} from '../../../validator/EventValidator';
import { StyledBox, StyledButton, StyledTextField, StyledTypography } from '../../common/StyledComponents';
import { ToolTipInfoIcon } from '../../common/ToolTipInfoIcon';
import { City } from '../../../types/City';
import { Country } from '../../../types/Country';
import { ErrorMessage, SuccessMessage } from '../../common/SnackbarAlert';
import { StyledTypograpy } from './StyledComponents';
import { FileUploader } from '../../common/FileUploader';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useTimeErrors } from '../../../hooks/UseTimeErrors';

enum CreateEventFormFields {
  name = 'name',
  description = 'description',
  capacity = 'capacity',
  eventType = 'eventType',
  country = 'country',
  city = 'city',
  location = 'location'
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '200px',
      width: '484px'
    }
  }
};

const INITIAL_START_DATETIME = initialDateTime('start');
const INITIAL_END_DATETIME = initialDateTime('end');

export const AddEventPage = () => {
  const name = useTextFieldErrors('', validateName);
  const description = useTextFieldErrors('', validateDescription);
  const capacity = useTextFieldErrors('', validateCapacity);
  const eventType = useTextFieldErrors('', validateEventType, false);
  const country = useTextFieldErrors('', validateCountry, false);
  const city = useTextFieldErrors('', validateCity, false);
  const location = useTextFieldErrors('', validateLocation);

  const [selectedImage, setSelectedImage] = useState(null);

  const [noCharactersInserted, setNoCharactersInserted] = useState(0);
  const [isSuccessfulMessageOpen, setIsSuccessfulMessageOpen] = useState(false);
  const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false);
  const dates = useTimeErrors(INITIAL_START_DATETIME, INITIAL_END_DATETIME, validateDate, validateDate);

  const formFieldsManagers = useMemo(
    () => ({
      [CreateEventFormFields.name]: name,
      [CreateEventFormFields.description]: description,
      [CreateEventFormFields.capacity]: capacity,
      [CreateEventFormFields.eventType]: eventType,
      [CreateEventFormFields.city]: city,
      [CreateEventFormFields.country]: country,
      [CreateEventFormFields.location]: location
    }),
    [name, description, capacity, eventType, country, city, location]
  );

  const onInputChange = useCallback(
    (ev) => {
      formFieldsManagers[ev.target.name].setFieldValue(ev.target.value);
    },
    [formFieldsManagers]
  );

  const createSelectMenu = useCallback((enumName) => {
    return filterIndexedEnumsKeys(enumName).map((typeName) => {
      const typeId = enumName[typeName];
      return (
        <MenuItem key={`option-${typeId}`} value={typeId}>
          {typeName}
        </MenuItem>
      );
    });
  }, []);

  const isAddEventAvailable = useMemo(() => {
    const isValidName = name.errors === '' && name.fieldValue !== '';
    const isValidDescription = description.errors === '';
    const isValidEventType = eventType.errors === '' && eventType.fieldValue !== '';
    const isValidCapacity = capacity.errors === '' && capacity.fieldValue !== '';
    const isValidCity = city.errors === '' && city.fieldValue !== '';
    const isValidCountry = country.errors === '' && country.fieldValue !== '';
    const isValidLocation = location.errors === '' && location.fieldValue !== '';
    const isValidStartTime = dates.errorsStartDate === '';
    const isValidEndTime = dates.errorsEndDate === '';
    return (
      isValidName &&
      isValidEventType &&
      isValidCapacity &&
      isValidDescription &&
      isValidCity &&
      isValidCountry &&
      isValidLocation &&
      isValidStartTime &&
      isValidEndTime
    );
  }, [name, eventType, capacity, description, city, country, location, dates]);

  const clearFields = () => {
    eventType.setFieldValue('');
    name.setFieldValue('');
    country.setFieldValue('');
    city.setFieldValue('');
    location.setFieldValue('');
    description.setFieldValue('');
    capacity.setFieldValue('');
    dates.setStartDateValue(initialDateTime('start'));
    dates.setEndDateValue(initialDateTime('end'));
  };

  const addEvent = async () => {
    dates.validateStartTime();
    dates.validateEndTime();

    const formData = new FormData();
    formData.append('eventType', String(parseInt(eventType.fieldValue)));
    formData.append('name', name.fieldValue);
    formData.append('description', description.fieldValue);
    formData.append('maxNoAttendees', capacity.fieldValue);
    formData.append('city', city.fieldValue);
    formData.append('country', country.fieldValue);
    formData.append('location', location.fieldValue);
    formData.append('image', selectedImage);
    formData.append('dateRange[startDate]', dates.startDateValue.toISOString());
    formData.append('dateRange[endDate]', dates.endDateValue.toISOString());

    try {
      const resp = await ApiService.postReq('/api/event/create-event', formData);
      if (resp.data) {
        setIsSuccessfulMessageOpen(true);
        clearFields();
      }
    } catch (error) {
      setIsErrorMessageOpen(true);
    }
  };

  return (
    <>
      <StyledBox component='form'>
        <SuccessMessage
          isSnackBarOpen={isSuccessfulMessageOpen}
          alertMessage={'Event added successfully!'}
          onClose={() => setIsSuccessfulMessageOpen(false)}
        />
        <ErrorMessage
          isSnackBarOpen={isErrorMessageOpen}
          alertMessage={'Error!'}
          onClose={() => setIsErrorMessageOpen(false)}
        />
        <StyledTypography variant='h4'>Add event</StyledTypography>
        <Box>
          <StyledTextField
            required
            select
            label='Event Type'
            placeholder='Event Type'
            name={CreateEventFormFields.eventType}
            value={eventType.fieldValue}
            onChange={onInputChange}
            onBlur={eventType.validate}
            error={eventType.hasErrors}
            helperText={eventType.errors}
            inputProps={{
              id: 'eventTypeField'
            }}
            FormHelperTextProps={{
              id: 'eventTypeError'
            }}
          >
            {createSelectMenu(EventType)}
          </StyledTextField>
          <ToolTipInfoIcon titleTooltip={'Event Type can be Movie, Concert or Talk'} />
        </Box>
        <Box>
          <StyledTextField
            required
            placeholder='Event name'
            name={CreateEventFormFields.name}
            value={name.fieldValue}
            onChange={onInputChange}
            onBlur={name.validate}
            error={name.hasErrors}
            helperText={name.errors}
            label='Name'
            InputProps={{
              autoComplete: 'off'
            }}
            inputProps={{
              id: 'eventNameField'
            }}
            FormHelperTextProps={{
              id: 'eventNameError'
            }}
            variant='outlined'
          />
          <ToolTipInfoIcon titleTooltip={'Name should have between 2 and 100 alphanumeric characters, including " "'} />
        </Box>
        <Box>
          <StyledTextField
            required
            select
            label='Country'
            placeholder='Country'
            name={CreateEventFormFields.country}
            value={country.fieldValue}
            onChange={onInputChange}
            onBlur={country.validate}
            error={country.hasErrors}
            helperText={country.errors}
            SelectProps={{
              MenuProps: MenuProps
            }}
            inputProps={{
              id: 'countryField'
            }}
            FormHelperTextProps={{
              id: 'countryError'
            }}
          >
            {createSelectMenu(Country)}
          </StyledTextField>
          <ToolTipInfoIcon titleTooltip={'Country can only be one of the fields inside the dropdown box'} />
        </Box>
        <Box>
          <StyledTextField
            required
            select
            label='City'
            placeholder='City'
            name={CreateEventFormFields.city}
            value={city.fieldValue}
            onChange={onInputChange}
            onBlur={city.validate}
            error={city.hasErrors}
            helperText={city.errors}
            SelectProps={{
              MenuProps: MenuProps
            }}
            inputProps={{
              id: 'cityField'
            }}
            FormHelperTextProps={{
              id: 'cityError'
            }}
          >
            {createSelectMenu(City)}
          </StyledTextField>
          <ToolTipInfoIcon titleTooltip={'City can only be one of the fields inside the dropdown box'} />
        </Box>
        <Box>
          <StyledTextField
            required
            placeholder='Location'
            name={CreateEventFormFields.location}
            value={location.fieldValue}
            onChange={onInputChange}
            onBlur={location.validate}
            error={location.hasErrors}
            helperText={location.errors}
            label='Location'
            InputProps={{
              autoComplete: 'off'
            }}
            inputProps={{
              id: 'locationField'
            }}
            FormHelperTextProps={{
              id: 'locationError'
            }}
            variant='outlined'
          />
          <ToolTipInfoIcon titleTooltip={'Location should have between 10 and 50 characters'} />
        </Box>
        <Box>
          <StyledTextField
            placeholder='This is a description'
            name={CreateEventFormFields.description}
            required={false}
            value={description.fieldValue}
            onChange={(e) => {
              onInputChange(e);
              setNoCharactersInserted(e.target.value.length);
            }}
            onBlur={description.validate}
            error={description.hasErrors}
            helperText={description.errors}
            label='Description'
            InputProps={{
              autoComplete: 'off'
            }}
            inputProps={{
              maxLength: 2000,
              id: 'descriptionField'
            }}
            FormHelperTextProps={{
              id: 'descriptionError'
            }}
            variant='outlined'
            multiline
            rows={7}
          />
          <ToolTipInfoIcon
            titleTooltip={'Description should not have more than 2000 alphanumeric characters, including " " and "-"'}
          />
          <StyledTypograpy variant='subtitle1'>{`${noCharactersInserted} / 2000`}</StyledTypograpy>
        </Box>
        <Box>
          <StyledTextField
            required
            type='number'
            placeholder={'1-100000'}
            name={CreateEventFormFields.capacity}
            value={capacity.fieldValue}
            onChange={onInputChange}
            onBlur={capacity.validate}
            error={capacity.hasErrors}
            helperText={capacity.errors}
            label='Capacity'
            InputProps={{
              autoComplete: 'off',
              inputProps: {
                min: 1,
                max: 100000,
                id: 'capacityField'
              }
            }}
            FormHelperTextProps={{
              id: 'capacityError'
            }}
          />
          <ToolTipInfoIcon titleTooltip={'Capacity should be between 1 and 100.000'} />
        </Box>
        <Box>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box>
              <DateTimePicker
                label='Start date and time'
                disablePast
                value={dates.startDateValue}
                onChange={(newValue) => dates.setStartDateValue(newValue)}
                renderInput={(params) => (
                  <StyledTextField
                    required
                    {...params}
                    helperText={dates.errorsStartDate}
                    onBlur={dates.validateStartTime}
                    error={dates.hasErrorsStartDate}
                    FormHelperTextProps={{
                      id: 'startDateError'
                    }}
                  />
                )}
                InputProps={{
                  id: 'startDateField'
                }}
              />
              <ToolTipInfoIcon titleTooltip={'Start date and time of the event'} />
            </Box>
            <Box>
              <DateTimePicker
                label='End date and time'
                disablePast
                value={dates.endDateValue}
                onChange={(newValue) => dates.setEndDateValue(newValue)}
                renderInput={(params) => (
                  <StyledTextField
                    required
                    {...params}
                    helperText={dates.errorsEndDate}
                    onBlur={dates.validateEndTime}
                    error={dates.hasErrorsEndDate}
                    FormHelperTextProps={{
                      id: 'endDateError'
                    }}
                  />
                )}
                InputProps={{
                  id: 'endDateField'
                }}
              />
              <ToolTipInfoIcon titleTooltip={'End date and time of the event'} />
            </Box>
          </LocalizationProvider>
        </Box>
        <FileUploader
          successMessage='File uploaded successfully'
          toolTipMessage='File cannot exceed more than 1MB, must be .png/.jpg/.jpeg and must have a name with maximum 100 characters'
          validator={validateImage}
          onFileChange={setSelectedImage}
        />
        <StyledButton id='addEventFormBtn' variant='outlined' onClick={addEvent} disabled={!isAddEventAvailable}>
          Add event
        </StyledButton>
      </StyledBox>
    </>
  );
};
