import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useContext, useState } from 'react';
import ApiService from '../../../api/ApiService';
import { ErrorMessEventReg } from '../../../types/ErrorMessEventReg';
import { EventItem } from '../../../types/EventItem';
import { ErrorMessage, SuccessMessage } from '../../common/SnackbarAlert';
import { UserContext } from '../../contexts/UserContext';

interface UnregisterToEventProps {
  readonly setOpenUnregister: (boolean) => void;
  readonly getEvent: () => void;
  readonly openUnregister: boolean;
  readonly event: EventItem;
}

export const UnRegisterToEvent = ({ setOpenUnregister, getEvent, openUnregister, event }: UnregisterToEventProps) => {
  const { user } = useContext(UserContext);
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  const [errorTextMessage, setErrorTextMessage] = useState('');
  const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);

  const unregisterToEvent = async () => {
    try {
      const resp = await ApiService.postReq(`api/reservation/${event.id}/cancel-reservation`, {
        Email: user.email
      });
      if (resp.data) {
        setSuccessSnackBarOpen(true);
        setOpenUnregister(false);
        getEvent();
        return;
      }
    } catch (error) {
      setErrorTextMessage(ErrorMessEventReg[error.response.data.ErrorCode]);
      setErrorSnackBarOpen(true);
      return;
    }
  };

  return (
    <>
      <SuccessMessage
        alertMessage={'You unregistered to this event!'}
        onClose={() => setSuccessSnackBarOpen(false)}
        isSnackBarOpen={successSnackBarOpen}
      />
      <Dialog id='unregister-dialog' open={openUnregister} onClose={() => setOpenUnregister(false)}>
        <DialogTitle>{`Unregister to ${event.name}`}</DialogTitle>
        <Box sx={{ margin: '0 auto' }}>
          <ErrorMessage
            alertMessage={errorTextMessage}
            onClose={() => setErrorSnackBarOpen(false)}
            isSnackBarOpen={errorSnackBarOpen}
          />
          <DialogContent>
            <DialogContentText id='unregister-dialog-text'>
              Are you sure you want to unregister to this event?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button id='button-no' onClick={() => setOpenUnregister(false)}>
              No
            </Button>
            <Button id='button-yes' onClick={() => unregisterToEvent()}>
              Yes
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
