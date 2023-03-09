import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MediatorEventsIdentifiers } from '../../events/EventsIdentifiers';
import Mediator from '../../events/Mediator';

export const LogoutButton = () => {
  return (
    <Button onClick={() => Mediator.publish(MediatorEventsIdentifiers.userLoggedOut)}>
      <Typography sx={{ p: 1 }}> Logout </Typography>
    </Button >
  );
};