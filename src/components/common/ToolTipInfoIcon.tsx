import { Tooltip } from '@mui/material';
import React from 'react';
import { StyledIcon } from './StyledComponents';

export const ToolTipInfoIcon = ({ titleTooltip }) => {
  return (
    <Tooltip title={titleTooltip}>
      <StyledIcon fontSize='medium' />
    </Tooltip>
  );
};
