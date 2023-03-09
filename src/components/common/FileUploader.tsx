import { Box, Button, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { isEmptyString } from '../../utils/StringUtils';
import { StyledFileUploadHintIcon, StyledTypographyUploadButton } from './StyledComponents';

export const FileUploader = ({ successMessage, toolTipMessage, validator, onFileChange }) => {
  const [helperText, setHelperText] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const errorMessage = validator(file);
    const isCurrentFileValid = isEmptyString(errorMessage);

    setHelperText(!isCurrentFileValid ? errorMessage : successMessage);
    setHasError(!isCurrentFileValid);
    if (isCurrentFileValid) {
      onFileChange(file);
    }
    else {
      onFileChange(null);
    }
  };

  return (
    <Box>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Button id='fileUploadBtn' variant='contained' component='label'> Upload Image
          <input type='file' hidden onChange={handleFileInput} />
        </Button>
        <Tooltip title={toolTipMessage}>
          <StyledFileUploadHintIcon fontSize='medium' />
        </Tooltip>
      </Box>
      {helperText &&
        <StyledTypographyUploadButton id='fileUploadMessage' variant='subtitle1' hasError={hasError}>
          {helperText}
        </StyledTypographyUploadButton>
      }
    </Box>
  );
};