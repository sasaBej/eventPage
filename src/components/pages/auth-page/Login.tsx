import React, { useCallback, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import ApiService from '../../../api/ApiService';
import { useTextFieldErrors } from '../../../hooks/UseTextFieldErrors';
import { handleValidationEmail, handleValidationPassword } from '../../../validator/UserValidator';
import { StyledBox, StyledButton, StyledTextField, StyledTypography } from '../../common/StyledComponents';
import { ErrorMessage } from '../../common/SnackbarAlert';
import Mediator from '../../../events/Mediator';
import { MediatorEventsIdentifiers } from '../../../events/EventsIdentifiers';

enum formFields {
  email = 'email',
  password = 'password'
}

export const Login = () => {
  const email = useTextFieldErrors('', handleValidationEmail);
  const password = useTextFieldErrors('', handleValidationPassword);
  const [uniqueError, setUniqueError] = useState('');
  const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

  const formFieldsManagers = useMemo(
    () => ({
      [formFields.email]: email,
      [formFields.password]: password
    }),
    [email, password]
  );

  const onInputChange = useCallback(
    (ev) => {
      formFieldsManagers[ev.target.name].setFieldValue(ev.target.value);
    },
    [formFieldsManagers]
  );

  const isRegisterAvailable = useMemo(() => {
    const isValidEmail = email.errors === '' && email.fieldValue !== '';
    const isValidPassword = password.errors === '' && password.fieldValue !== '';
    return isValidEmail && isValidPassword;
  }, [email, password]);

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      const resp = await ApiService.postReq('/api/user/login', {
        email: email.fieldValue,
        password: password.fieldValue
      });

      if (resp.data) {
        Mediator.publish(MediatorEventsIdentifiers.userLoggedIn, resp.data);
        setUniqueError('');
      }
    } catch (error) {
      if (error) {
        setIsSnackBarOpen(true);
      }
    }
  };

  return (
    <StyledBox component='form'>
      <ErrorMessage
        alertMessage='Wrong credentials!'
        onClose={() => setIsSnackBarOpen(false)}
        isSnackBarOpen={isSnackBarOpen}
      />
      <StyledTypography variant='h4'>Login</StyledTypography>
      <Box>
        <StyledTextField
          required
          placeholder='john_doe@yahoo.com'
          label='Email'
          variant='outlined'
          name={formFields.email}
          value={email.fieldValue}
          error={email.hasErrors || uniqueError !== ''}
          helperText={email.hasErrors ? 'Invalid email' : ''}
          onBlur={email.validate}
          onChange={onInputChange}
          InputProps={{
            autoComplete: 'off',
            readOnly: false
          }}
          inputProps={{
            id: 'loginEmail'
          }}
          FormHelperTextProps={{
            id: 'emailErrorLogin'
          }}
        />
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
          helperText={password.hasErrors ? 'Invalid password' : ''}
          onBlur={password.validate}
          onChange={onInputChange}
          InputProps={{
            autoComplete: 'off',
            readOnly: false
          }}
          inputProps={{
            id: 'loginPassword'
          }}
          FormHelperTextProps={{
            id: 'passwordErrorLogin'
          }}
          variant='outlined'
        />
      </Box>
      <StyledButton id='submitBtn' onClick={loginUser} disabled={!isRegisterAvailable} type='submit' variant='contained'>
        Login
      </StyledButton>
    </StyledBox>
  );
};
