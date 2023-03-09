import React from 'react';
import Popover from '@mui/material/Popover';
import { LogoutButton } from './LogoutButton';

export function LogoutPopover({ anchorEl, idName, handleClose, openState }) {

  return (
    <Popover
      id={idName}
      open={openState}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
    >
      <LogoutButton />
    </Popover>

  );
}
