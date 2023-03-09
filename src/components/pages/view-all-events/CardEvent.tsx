import React from 'react';
import { Box, Button, Card, Tooltip, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { EventType } from '../../../types/EventType';
import { findEnumKeyWithValue } from '../../../utils/ObjectUtils';
import { City } from '../../../types/City';
import { Country } from '../../../types/Country';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PublicIcon from '@mui/icons-material/Public';
import { isBetween, isNullOrUndefined } from '../../../utils/StringUtils';
import { Link } from 'react-router-dom';
import { EventItem } from '../../../types/EventItem';
import {
  StyledBoxFlex,
  StyledCardEventDetails,
  StyledCardTitleEvent,
  StyledTypographyCardEvents,
  StyledTypographyEvent
} from '../../common/StyledComponents';
import eventImage from '../../../assets/img/event_image.png';
import { StyledCardEventBox } from './StyledComponents';

export const CardEvent = ({ eventTypeId, name, address, maxNoAttendees, description, id, imageData }: EventItem) => {
  return (
    <Card id='eventCard' sx={{ maxWidth: 800, display: 'flex', maxHeight: 500 }}>
      <Box width='300px' height='300px'>
        <img
          src={imageData == null ? eventImage : `data:image/jpeg;base64,${imageData}`}
          width='300px'
          height='300px'
          style={{ objectFit: 'contain', alignSelf: 'flex-start' }}
        />
      </Box>
      <StyledCardEventBox>
        <CardContent>
          <StyledTypographyEvent sx={{ fontSize: 14 }} gutterBottom>
            {findEnumKeyWithValue(eventTypeId, EventType)}
          </StyledTypographyEvent>
          <Tooltip title={name} placement='bottom-start'>
            <StyledCardTitleEvent>
              <StyledTypographyCardEvents variant='h5'>{name}</StyledTypographyCardEvents>
            </StyledCardTitleEvent>
          </Tooltip>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '20px 0'
            }}
          >
            <Tooltip title={address.location}>
              <StyledBoxFlex>
                <LocationOnIcon />
                <StyledCardEventDetails>
                  <StyledTypographyEvent>{address.location}</StyledTypographyEvent>
                </StyledCardEventDetails>
              </StyledBoxFlex>
            </Tooltip>
            <Tooltip title={findEnumKeyWithValue(address.cityId, City)}>
              <StyledBoxFlex>
                <LocationCityIcon />
                <StyledCardEventDetails>
                  <StyledTypographyEvent>{findEnumKeyWithValue(address.cityId, City)}</StyledTypographyEvent>
                </StyledCardEventDetails>
              </StyledBoxFlex>
            </Tooltip>
            <Tooltip title={findEnumKeyWithValue(address.countryId, Country)}>
              <StyledBoxFlex>
                <PublicIcon />
                <StyledCardEventDetails>
                  <StyledTypographyEvent>{findEnumKeyWithValue(address.countryId, Country)}</StyledTypographyEvent>
                </StyledCardEventDetails>
              </StyledBoxFlex>
            </Tooltip>
            <Tooltip title={maxNoAttendees}>
              <StyledBoxFlex>
                <AssignmentIndIcon />
                <StyledCardEventDetails>
                  <StyledTypographyEvent>{maxNoAttendees}</StyledTypographyEvent>
                </StyledCardEventDetails>
              </StyledBoxFlex>
            </Tooltip>
          </Box>
          <Typography
            variant='body2'
            sx={{
              wordBreak: 'break-word'
            }}
          >
            {!isNullOrUndefined(description) && isBetween(description, 148, 150)
              ? description.slice(0, -2) + '...'
              : description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            marginBottom: '15px'
          }}
        >
          <Link to={`/event/${id}`}>
            <Button size='small' endIcon={<ArrowForwardIcon />}>
              More info
            </Button>
          </Link>
        </CardActions>
      </StyledCardEventBox>
    </Card>
  );
};
