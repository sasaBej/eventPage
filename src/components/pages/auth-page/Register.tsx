import React, { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import ApiService from '../../../api/ApiService';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { ToolTipInfoIcon } from '../../common/ToolTipInfoIcon';
import { useTextFieldErrors } from '../../../hooks/UseTextFieldErrors';
import {
  handleValidationCompany,
  handleValidationEmail,
  handleValidationFirstName,
  handleValidationLastName,
  handleValidationPassword
} from '../../../validator/UserValidator';
import { StyledBox, StyledButton, StyledTextField, StyledTypography } from '../../common/StyledComponents';
import { SuccessMessage } from '../../common/SnackbarAlert';

enum formFields {
  firstName = 'firstName',
  lastName = 'lastName',
  company = 'company',
  email = 'email',
  password = 'password'
}

export const Register = () => {
  const firstName = useTextFieldErrors('', handleValidationFirstName);
  const lastName = useTextFieldErrors('', handleValidationLastName);
  const company = useTextFieldErrors('', handleValidationCompany);
  const email = useTextFieldErrors('', handleValidationEmail);
  const password = useTextFieldErrors('', handleValidationPassword, false);
  const [uniqueError, setUniqueError] = useState('');

  const formFieldsManagers = useMemo(
    () => ({
      [formFields.firstName]: firstName,
      [formFields.lastName]: lastName,
      [formFields.company]: company,
      [formFields.email]: email,
      [formFields.password]: password
    }),
    [firstName, lastName, company, email, password]
  );

  const onInputChange = useCallback(
    (ev) => {
      formFieldsManagers[ev.target.name].setFieldValue(ev.target.value);
    },
    [formFieldsManagers]
  );

  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const isRegisterAvailable = useMemo(() => {
    const isValidFirstName = firstName.errors === '' && firstName.fieldValue !== '';
    const isValidLastName = lastName.errors === '' && lastName.fieldValue !== '';
    const isValidEmail = email.errors === '' && email.fieldValue !== '';
    const isValidCompany = company.errors === '' && company.fieldValue !== '';
    const isValidPassword = password.errors === '' && password.fieldValue !== '';
    return isValidFirstName && isValidLastName && isValidEmail && isValidCompany && isValidPassword;
  }, [firstName, lastName, email, company, password]);

  const clearFields = () => {
    firstName.setFieldValue('');
    lastName.setFieldValue('');
    email.setFieldValue('');
    company.setFieldValue('');
    password.setFieldValue('');
  };

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const resp = await ApiService.postReq('/api/user/create-user', {
        firstName: firstName.fieldValue,
        lastName: lastName.fieldValue,
        email: email.fieldValue,
        company: company.fieldValue,
        password: password.fieldValue
      });
      if (resp.data) {
        setIsSnackBarOpen(true);
        setUniqueError('');
        clearFields();
      }
    } catch (error) {
      if (error.response.data.ErrorCode === 100) {
        setUniqueError('Email should be unique');
        return;
      }
      return setUniqueError('Error');
    }
  };

  return (
    <StyledBox component='form'>
      <SuccessMessage
        isSnackBarOpen={isSnackBarOpen}
        alertMessage={'Registration successful'}
        onClose={() => setIsSnackBarOpen(false)}
      />
      <StyledTypography variant='h4'>Request log-in credentials</StyledTypography>
      <Box>
        <StyledTextField
          required
          name={formFields.firstName}
          placeholder='John'
          label='First Name'
          value={firstName.fieldValue}
          error={firstName.hasErrors}
          helperText={firstName.errors}
          onBlur={firstName.validate}
          onChange={onInputChange}
          InputProps={{
            autoComplete: 'off',
            readOnly: false
          }}
          inputProps={{
            id: 'registerFirstName'
          }}
          FormHelperTextProps={{
            id: 'firstNameErrorRegister'
          }}
          variant='outlined'
        ></StyledTextField>
        <ToolTipInfoIcon
          titleTooltip={'First Name should have between 2 and 100 alpha characters, including "-" and " "'}
        />
      </Box>
      <Box>
        <StyledTextField
          required
          name={formFields.lastName}
          placeholder='Doe'
          label='Last Name'
          value={lastName.fieldValue}
          error={lastName.hasErrors}
          helperText={lastName.errors}
          onBlur={lastName.validate}
          onChange={onInputChange}
          InputProps={{
            autoComplete: 'off',
            readOnly: false
          }}
          inputProps={{
            id: 'registerLastName'
          }}
          FormHelperTextProps={{
            id: 'lastNameErrorRegister'
          }}
          variant='outlined'
        />
        <ToolTipInfoIcon
          titleTooltip={'Last Name should have between 2 and 100 alpha characters, including "-" and " "'}
        />
      </Box>
      <Box>
        <StyledTextField
          required
          name={formFields.email}
          placeholder='john_doe@yahoo.com'
          label='Email'
          value={email.fieldValue}
          error={email.hasErrors || uniqueError !== ''}
          helperText={email.errors || uniqueError}
          onBlur={email.validate}
          onChange={onInputChange}
          InputProps={{
            autoComplete: 'off',
            readOnly: false
          }}
          inputProps={{
            id: 'registerEmail'
          }}
          FormHelperTextProps={{
            id: 'emailErrorRegister'
          }}
          variant='outlined'
        />
        <ToolTipInfoIcon
          titleTooltip={
            'Email should have between 7 and 74 characters and Email should have a valid format {alphanumeric and underline}@{string}.com'
          }
        />
      </Box>
      <Box>
        <StyledTextField
          required
          name={formFields.company}
          label='Company'
          placeholder='Evozon'
          value={company.fieldValue}
          error={company.hasErrors}
          helperText={company.errors}
          onBlur={company.validate}
          onChange={onInputChange}
          InputProps={{
            autoComplete: 'off',
            readOnly: false
          }}
          inputProps={{
            id: 'registerCompany'
          }}
          FormHelperTextProps={{
            id: 'companyErrorRegister'
          }}
          variant='outlined'
        />
        <ToolTipInfoIcon titleTooltip={'Company should have between 2 and 100 alphanumeric characters'} />
      </Box>
      <Box>
        <StyledTextField
          required
          type='password'
          label='Password'
          name={formFields.password}
          placeholder='******'
          value={password.fieldValue}
          error={password.hasErrors}
          helperText={password.errors}
          onBlur={password.validate}
          onChange={onInputChange}
          InputProps={{
            autoComplete: 'off',
            readOnly: false
          }}
          inputProps={{
            id: 'registerPassword'
          }}
          FormHelperTextProps={{
            id: 'passwordErrorRegister'
          }}
          variant='outlined'
        />
        <ToolTipInfoIcon titleTooltip={'Password should have between 2 and 20 characters, excluding white space'} />
      </Box>
      <StyledButton
        id='requestCredentialsBtn'
        endIcon={<KeyboardArrowRightIcon />}
        onClick={registerUser}
        disabled={!isRegisterAvailable}
        type='submit'
        variant='contained'
      >
        Request credentials
      </StyledButton>
    </StyledBox>
  );
};
