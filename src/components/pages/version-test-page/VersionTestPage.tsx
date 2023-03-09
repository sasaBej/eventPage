import React, { useState } from 'react';
import { Grid, styled } from '@mui/material';
import ThemeSwitch from './ThemeSwitch';
import ProjectVersion from './ProjectVersion';
import BeachImage from '../../../assets/img/beach_landscape.jpg';
import { AppVersionContext } from '../../contexts/AppVersionContext';

const GridContainer = styled(Grid)(({ theme }) => ({
  backgroundImage: theme.palette.mode === 'light' ? 'none' : `url(${BeachImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '100%'
}));

const VersionTestPage = () => {
  const [version, setVersion] = useState<string>('');

  return (
    <AppVersionContext.Provider value={{ version, setVersion }}>
      <GridContainer container direction='column' alignContent='center' padding={4}>
        <Grid xs={'auto'} item>
          <ProjectVersion />
        </Grid>
        <Grid xs={'auto'} item sx={{ display: 'flex', justifyContent: 'center' }}>
          <ThemeSwitch />
        </Grid>
      </GridContainer>
    </AppVersionContext.Provider>
  );
};

export default VersionTestPage;
