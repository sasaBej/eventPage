import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface SnackBarAlertProps {
  readonly alertMessage: string;
  readonly isSnackBarOpen: boolean;
  onClose: () => void;
}

const SUCCESS_MESSAGE_DURATION = 10000;
const ERROR_MESSAGE_DURATION = 30000;

export const SuccessMessage = ({ isSnackBarOpen, alertMessage, onClose }: SnackBarAlertProps) => {
  return (
    <Snackbar
      open={isSnackBarOpen}
      autoHideDuration={SUCCESS_MESSAGE_DURATION}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity='success' sx={{ width: '100%' }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export const ErrorMessage = ({ isSnackBarOpen, alertMessage, onClose }: SnackBarAlertProps) => {
  return (
    <Snackbar
      sx={{ position: 'inherit' }}
      open={isSnackBarOpen}
      autoHideDuration={ERROR_MESSAGE_DURATION}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity='error' sx={{ width: '100%' }}>
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};
