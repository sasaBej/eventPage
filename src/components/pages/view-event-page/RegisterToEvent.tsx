import React, { useCallback, useContext, useMemo, useState } from 'react';
import {
  StyledDialogContentText,
  StyledDialogRegToEvent,
  StyledFieldRegToEventDisable,
  StyledFieldRegToEventEnable,
  StyledTypographyCardEvents
} from '../../common/StyledComponents';
import { UserContext } from '../../contexts/UserContext';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import ApiService from '../../../api/ApiService';
import { EventItem } from '../../../types/EventItem';
import { ErrorMessage, SuccessMessage } from '../../common/SnackbarAlert';
import { useTextFieldErrors } from '../../../hooks/UseTextFieldErrors';
import { handleValidationEmail } from '../../../validator/UserValidator';
import { ErrorMessEventReg } from '../../../types/ErrorMessEventReg';
interface RegisterToEventProps {
  readonly setOpenRegister: (boolean) => void;
  readonly getEvent: () => void;
  readonly openRegister: boolean;
  readonly event: EventItem;
}

enum formFields {
  email = 'email'
}

export const RegisterToEvent = ({ setOpenRegister, openRegister, getEvent, event }: RegisterToEventProps) => {
  const { user } = useContext(UserContext);
  const [errorTextMessage, setErrorTextMessage] = useState('');
  const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const email = useTextFieldErrors('', handleValidationEmail);

  const handleChangeCheckBox = () => {
    setChecked(!checked);

    if (checked === true) {
      email.setFieldValue('');
      email.setErrors('');
    }
  };

  const onInputChange = useCallback(
    (ev) => {
      email.setFieldValue(ev.target.value);
    },
    [email]
  );

  const isRegToEventAvailable = useMemo(() => {
    const isValidEmail = email.errors === '' && email.fieldValue !== '';
    return isValidEmail;
  }, [email]);

  const RegisterToEvent = async () => {
    try {
      const resp = await ApiService.postReq(`api/reservation/${event.id}/create-reservation`, {
        Email: user.email,
        AccompanyingPerson: email.fieldValue
      });
      if (resp.data) {
        setSuccessSnackBarOpen(true);
        setOpenRegister(false);
        getEvent();
        return;
      }
    } catch (error) {
      if (error.response.status === 409) setErrorTextMessage(ErrorMessEventReg[error.response.data.ErrorCode]);
      else if (error.response.status === 400) {
        setErrorTextMessage('Accompanying person cannot have the same email as the user');
      } else setErrorTextMessage('Error');
      setErrorSnackBarOpen(true);
      return;
    }
  };
  return (
    <>
      <SuccessMessage
        alertMessage={'Registration successful'}
        onClose={() => setSuccessSnackBarOpen(false)}
        isSnackBarOpen={successSnackBarOpen}
      />
      <Dialog fullWidth={true} maxWidth='md' open={openRegister} onClose={() => setOpenRegister(false)}>
        <DialogTitle>Register</DialogTitle>
        <Box
          sx={{
            margin: '0 auto'
          }}
        >
          <ErrorMessage
            alertMessage={errorTextMessage}
            onClose={() => setErrorSnackBarOpen(false)}
            isSnackBarOpen={errorSnackBarOpen}
          />
          <DialogContent>
            <Typography sx={{ display: 'inline' }}>{'You will register for '}</Typography>
            <Tooltip title={event.name.toUpperCase()}>
              <StyledDialogContentText>
                <StyledTypographyCardEvents>{event.name.toUpperCase()}</StyledTypographyCardEvents>
              </StyledDialogContentText>
            </Tooltip>

            <Stack direction='row' spacing={4} divider={<Divider orientation='vertical' flexItem />}>
              <Stack
                direction='column'
                spacing={4}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <StyledFieldRegToEventDisable
                  value={user.firstName}
                  fullWidth
                  required
                  placeholder='John'
                  label='First Name'
                  InputProps={{
                    autoComplete: 'off',
                    readOnly: true,
                    id: 'userFirstName'
                  }}
                  variant='outlined'
                />
                <StyledFieldRegToEventDisable
                  required
                  value={user.lastName}
                  placeholder='Doe'
                  label='Last Name'
                  InputProps={{
                    autoComplete: 'off',
                    readOnly: true,
                    id: 'userLastName'
                  }}
                  variant='outlined'
                />
                <StyledFieldRegToEventDisable
                  value={user.company}
                  required
                  label='Company'
                  placeholder='Evozon'
                  InputProps={{
                    autoComplete: 'off',
                    readOnly: true,
                    id: 'userCompany'
                  }}
                  variant='outlined'
                />
                <StyledFieldRegToEventDisable
                  required
                  value={user.email}
                  placeholder='john_doe@yahoo.com'
                  label='Email'
                  InputProps={{
                    autoComplete: 'off',
                    readOnly: true,
                    id: 'userEmail'
                  }}
                  variant='outlined'
                />
              </Stack>
              <Stack direction='column' spacing={3}>
                <StyledDialogRegToEvent>Accompanying person</StyledDialogRegToEvent>
                <FormControlLabel
                  id='accompanyingCheckBox'
                  control={<Checkbox checked={checked} onChange={handleChangeCheckBox} />}
                  label='Yes'
                />
                <StyledFieldRegToEventEnable
                  disabled={!checked && !isRegToEventAvailable}
                  required
                  placeholder='john_doe@yahoo.com'
                  label='Email'
                  variant='outlined'
                  name={formFields.email}
                  value={email.fieldValue}
                  error={checked === true ? email.hasErrors : false}
                  helperText={checked === true ? email.errors : false}
                  onBlur={email.validate}
                  onChange={onInputChange}
                  InputProps={{
                    autoComplete: 'off',
                    readOnly: false,
                    id: 'accompanyingEmailField'
                  }}
                  FormHelperTextProps={{
                    id: 'accompanyingEmailError'
                  }}
                />
              </Stack>
            </Stack>
          </DialogContent>
        </Box>
        <DialogActions>
          <Button id='cancelRegisterBtn' onClick={() => setOpenRegister(false)}>Cancel</Button>
          <Button id='subscribeBtn' disabled={checked && !isRegToEventAvailable} onClick={RegisterToEvent}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
