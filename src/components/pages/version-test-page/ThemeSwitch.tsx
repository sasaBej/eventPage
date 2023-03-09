import React, { useContext } from 'react';
import { Switch, useTheme } from '@mui/material';
import Mediator from '../../../events/Mediator';
import { MediatorEventsIdentifiers } from '../../../events/EventsIdentifiers';
import { AppVersionContext } from '../../contexts/AppVersionContext';

const ThemeSwitch = () => {
  const { palette } = useTheme();
  const { version } = useContext(AppVersionContext);

  return (
    <Switch
      disabled={version.length === 0}
      checked={palette.mode === 'dark' ? true : false}
      onChange={(event) => {
        const newColorMode = event.target.checked ? 'dark' : 'light';
        Mediator.publish(MediatorEventsIdentifiers.changeColorTheme, { newColorMode });
      }}
    />
  );
};

export default ThemeSwitch;
