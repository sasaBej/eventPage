import { AppBar, CardMedia, Grid, Toolbar, Tooltip } from '@mui/material';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/evozon_logo.png';
import { UserContext } from '../contexts/UserContext';
import { LogoutPopover } from './LogoutPopover';
import { StyledButtonNavBar, StyledCard, StyledGridItemUserName, StyledTypographyUserName } from './StyledComponents';

export const NavBar = () => {
  const { user } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid item>
            <StyledCard id='homeBtn'>
              <Link to={'/viewAllEvents/1'}>
                <CardMedia component='img' image={logo} alt='Evozon logo' height='80px' />
              </Link>
            </StyledCard>
          </Grid>
          <Grid item>
            <Grid container justifyContent='space-between' alignItems='center' spacing={2}>
              <Grid item>
                <Link to={'/add-event'} style={{ textDecoration: 'none' }}>
                  <StyledButtonNavBar id='addEventBtn' variant='contained'>
                    Add Event
                  </StyledButtonNavBar>
                </Link>
              </Grid>
              <Tooltip title={`${user.firstName} ${user.lastName}`}>
                <StyledGridItemUserName item onClick={handleClick} sx={{ cursor: 'pointer' }}>
                  <StyledTypographyUserName id='firstNameField'>{user.firstName}</StyledTypographyUserName>
                  <StyledTypographyUserName id='lastNameField'>{user.lastName}</StyledTypographyUserName>
                </StyledGridItemUserName>
              </Tooltip>
              <LogoutPopover anchorEl={anchorEl} handleClose={handleClose} openState={open} idName={id} />
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
