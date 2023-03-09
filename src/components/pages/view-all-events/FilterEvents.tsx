import React from 'react';
import { Box, Divider, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { filterIndexedEnumsKeys } from '../../../utils/ObjectUtils';
import { EventType } from '../../../types/EventType';

export const FilterEvents = ({ eventType, setEventType, isParticipating, setIsParticipating }) => {
  const handleParticipateSelect = (event) => {
    setIsParticipating(event.target.value);
  };
  const handleSelectEventType = (event) => {
    setEventType(event.target.value);
  };

  return (
    <Box flex={2} mt={2} ml={4}>
      <Box position='fixed'>
        <Typography variant='h4' mb={4}>
          Filters
        </Typography>
        <Typography variant='h6' mb={2} mt={2}>
          Event type
        </Typography>
        <Divider />
        <Box mt={2} mb={2}>
          <RadioGroup value={eventType} onChange={handleSelectEventType}>
            <FormControlLabel id='eventAll' value='0' control={<Radio />} label='All' />
            {filterIndexedEnumsKeys(EventType).map((typeName) => {
              const typeId = EventType[typeName];
              return (
                <FormControlLabel
                  id={`event${typeName}`}
                  key={typeId}
                  value={typeId}
                  control={<Radio />}
                  label={typeName}
                />
              );
            })}
          </RadioGroup>
        </Box>
        <Divider />
        <Typography variant='h6' mb={2} mt={2}>
          Participating
        </Typography>
        <RadioGroup value={isParticipating} onChange={handleParticipateSelect}>
          <FormControlLabel id='participatingAll' value='0' control={<Radio />} label='All' />
          <FormControlLabel id='participatingYes' value='1' control={<Radio />} label='Yes' />
          <FormControlLabel id='participatingNo' value='2' control={<Radio />} label='No' />
        </RadioGroup>
      </Box>
    </Box>
  );
};
