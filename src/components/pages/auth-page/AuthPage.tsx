import React from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Register } from './Register';
import { Login } from './Login';
import { StyledContainer, StyledTabsList, StyledTab } from '../../common/StyledComponents';

export const AuthPage = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <StyledContainer>
      <TabContext value={value}>
        <Box>
          <StyledTabsList id='pageTabs' onChange={handleChange} centered>
            <StyledTab label='Register' value='2' sx={{ fontWeight: 'bolder' }} />
            <StyledTab label='Login' value='1' sx={{ fontWeight: 'bolder' }} />
          </StyledTabsList>
        </Box>
        <TabPanel value='2'>
          <Register />
        </TabPanel>
        <TabPanel value='1'>
          <Login />
        </TabPanel>
      </TabContext>
    </StyledContainer>
  );
};
