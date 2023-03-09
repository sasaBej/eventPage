import { Box } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

export const ErrorPage = () => {
  const { state } = useLocation();
  return <Box>{state as string}</Box>;
};
