import { Box, Pagination, styled } from '@mui/material';

export const StyledPagination = styled(Pagination)({
  display: 'flex',
  justifyContent: 'center',
  padding: '30px 0'
});

export const StyledBoxAllEvents = styled(Box)({
  height: '100vh',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

export const StyledCardEventBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
});
