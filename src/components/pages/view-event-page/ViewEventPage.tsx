import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Container, Grid, Stack, Typography, Button, Tooltip } from '@mui/material';
import eventImage from '../../../assets/img/event_image.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EventIcon from '@mui/icons-material/Event';
import { StyledBoxEventDetails } from './StyledComponents';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../../api/ApiService';
import { findEnumKeyWithValue } from '../../../utils/ObjectUtils';
import { EventType } from '../../../types/EventType';
import { City } from '../../../types/City';
import { Country } from '../../../types/Country';
import { StyledEventTitle, StyledTypographyEvent, StyledTypographyTitleEvent } from '../../common/StyledComponents';
import { UserContext } from '../../contexts/UserContext';
import { RegisterToEvent } from './RegisterToEvent';
import { defaultEventWithAttendance, EventWithAttendance } from '../../../types/EventWithAttendance';
import { isNullOrUndefined } from '../../../utils/StringUtils';
import { UnRegisterToEvent } from './UnregisterToEvent';

type ViewEventParams = {
  eventId: string;
};

export const ViewEventPage = () => {
  const { eventId } = useParams<ViewEventParams>();
  const navigate = useNavigate();
  const [eventWithAttendance, setEventWithAttendance] = useState<EventWithAttendance>(defaultEventWithAttendance);
  const { user } = useContext(UserContext);
  const [openRegister, setOpenRegister] = useState(false);
  const [openUnregister, setOpenUnregister] = useState(false);

  const getEvent = useCallback(async () => {
    try {
      const resp = await ApiService.postReq(`/api/event/${eventId}`, { email: user.email });
      if (resp.data) {
        setEventWithAttendance(resp.data);
      }
    } catch (error) {
      if (error.response.data.ErrorCode === 200) {
        return navigate('/error-page', { state: 'The event you are searching for does not exist' });
      } else if (error.response.data.error === 101) {
        return navigate('/error-page', { state: 'User does not exist' });
      } else return navigate('/error-page', { state: 'Error' });
    }
  }, []);

  useEffect(() => {
    if (isNaN(parseInt(eventId)) || parseInt(eventId) <= 0) {
      navigate('/error-page', { state: 'Event can not be found' });
    } else {
      getEvent();
    }
  }, [eventId]);

  const showDialogRegister = () => {
    setOpenRegister((openRegister) => (openRegister = !openRegister));
  };

  const showDialogUnregister = () => {
    setOpenUnregister(true);
  };

  return (
    <Box>
      <Container maxWidth='lg' sx={{ marginTop: '35px' }}>
        <Stack spacing={5}>
          <Stack direction='row' spacing={4} alignItems='end'>
            <Stack spacing={5}>
              <Box>
                <Tooltip title={eventWithAttendance.event.name} placement='bottom-start'>
                  <StyledEventTitle>
                    <StyledTypographyTitleEvent id='eventNameField' variant='h1'>
                      {eventWithAttendance.event.name}
                    </StyledTypographyTitleEvent>
                  </StyledEventTitle>
                </Tooltip>
                <Typography id='eventTypeField' variant='overline'>
                  {findEnumKeyWithValue(eventWithAttendance.event.eventTypeId, EventType)}
                </Typography>
              </Box>
              <StyledBoxEventDetails>
                <Typography fontWeight='bold' marginBottom='10px'>
                  Event details
                </Typography>
                <Grid container spacing={20}>
                  <Grid item>
                    <Grid container direction='column' spacing={2}>
                      <Grid item>
                        <Tooltip
                          placement='bottom-start'
                          title={`${findEnumKeyWithValue(
                            eventWithAttendance.event.address.cityId,
                            City
                          )}, ${findEnumKeyWithValue(eventWithAttendance.event.address.countryId, Country)}`}
                        >
                          <Stack direction='row' maxWidth='350px'>
                            <LocationOnIcon />
                            <StyledTypographyEvent id='eventCityAndCountryField'>{`${findEnumKeyWithValue(
                              eventWithAttendance.event.address.cityId,
                              City
                            )}, ${findEnumKeyWithValue(
                              eventWithAttendance.event.address.countryId,
                              Country
                            )}`}</StyledTypographyEvent>
                          </Stack>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip placement='bottom-start' title={eventWithAttendance.event.address.location}>
                          <Stack direction='row' maxWidth='350px'>
                            <LocationCityIcon />
                            <StyledTypographyEvent id='eventLocationField'>
                              {eventWithAttendance.event.address.location}
                            </StyledTypographyEvent>
                          </Stack>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Stack direction='row'>
                          <EventIcon />
                          <StyledTypographyEvent id='eventStartDateField'>{`Starting from: ${new Date(
                            eventWithAttendance.event.startDate.toString() + 'Z'
                          ).toLocaleString([], {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}`}</StyledTypographyEvent>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Stack direction='row'>
                          <EventIcon />
                          <StyledTypographyEvent id='eventEndDateField'>{`To: ${new Date(
                            eventWithAttendance.event.endDate.toString() + 'Z'
                          ).toLocaleString([], {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}`}</StyledTypographyEvent>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction='column' spacing={2}>
                      <Grid item>
                        <Stack direction='row'>
                          <PermContactCalendarIcon />
                          <StyledTypographyEvent id='eventAttendeesField'>{`${eventWithAttendance.event.noAttendees} attendees/${eventWithAttendance.event.maxNoAttendees} capacity`}</StyledTypographyEvent>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </StyledBoxEventDetails>
            </Stack>
            <Stack>
              <img
                src={
                  eventWithAttendance.event.imageData == null
                    ? eventImage
                    : `data:image/jpeg;base64,${eventWithAttendance.event.imageData}`
                }
                width='300px'
                height='300px'
                style={{ objectFit: 'contain', alignSelf: 'flex-start' }}
              />
              <StyledBoxEventDetails>
                <Typography fontWeight='bold'>Registration details</Typography>
                <RegisterToEvent
                  setOpenRegister={setOpenRegister}
                  openRegister={openRegister}
                  event={eventWithAttendance.event}
                  getEvent={getEvent}
                />
                <UnRegisterToEvent
                  setOpenUnregister={setOpenUnregister}
                  openUnregister={openUnregister}
                  event={eventWithAttendance.event}
                  getEvent={getEvent}
                />
                <Button
                  id='registerToEventBtn'
                  endIcon={<KeyboardArrowRightIcon />}
                  onClick={!eventWithAttendance.attending ? showDialogRegister : showDialogUnregister}
                >
                  {eventWithAttendance.attending ? 'Unregister' : 'Register'}
                </Button>
              </StyledBoxEventDetails>
            </Stack>
          </Stack>
          <StyledBoxEventDetails
            id='eventDescriptionField'
            sx={{
              height: '100vh',
              wordBreak: 'break-word'
            }}
          >
            <Typography variant='h2' marginBottom='10px'>
              Description
            </Typography>
            {isNullOrUndefined(eventWithAttendance.event.description) ? '' : eventWithAttendance.event.description}
          </StyledBoxEventDetails>
        </Stack>
      </Container>
    </Box>
  );
};
