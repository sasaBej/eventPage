import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { CardEvent } from './CardEvent';
import { FilterEvents } from './FilterEvents';
import ApiService from '../../../api/ApiService';
import { AllEvents } from '../../../types/AllEvents';
import { EventItem } from '../../../types/EventItem';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { filterValidator } from '../../../validator/FilterValidator';
import { StyledBoxAllEvents, StyledPagination } from './StyledComponents';
import { MediatorEventsIdentifiers } from '../../../events/EventsIdentifiers';
import Mediator from '../../../events/Mediator';

const CARDS_EVENTS_PER_PAGE = 5;

export const ViewAllEvents = () => {
  const [allEvents, setAllEvents] = useState<AllEvents>({ noItems: 0, items: [] });
  const { pageId } = useParams<string>();
  const navigate = useNavigate();
  const [eventType, setEventType] = useState('0');
  const [isParticipating, setIsParticipating] = useState('0');
  const { user } = useContext(UserContext);

  const totalNumberOfPages = (totalNumbers) => {
    return Math.ceil(totalNumbers / 5);
  };

  const getAllEvents = useCallback(
    async (pageId) => {
      try {
        const resp = await ApiService.postReq(
          '/api/event/get-events',
          filterValidator(parseInt(pageId), parseInt(eventType), isParticipating, user.email, CARDS_EVENTS_PER_PAGE)
        );
        if (resp.data) {
          setAllEvents(resp.data);
        }
      } catch (error) {
        error.response.data;
      }
    },
    [pageId, eventType, isParticipating, user.email]
  );

  useEffect(() => {
    getAllEvents(1);
    navigate('/viewAllEvents/1');
  }, [eventType, isParticipating]);

  useEffect(() => {
    getAllEvents(pageId);
    navigate(`/viewAllEvents/${pageId}`);
  }, [pageId]);

  useEffect(() => {
    Mediator.publish(MediatorEventsIdentifiers.scrollContentWrapperToTop);
  }, [pageId]);

  return (
    <Container maxWidth='xl' sx={{ height: '100vh' }}>
      <StyledBoxAllEvents>
        <Stack direction='row' spacing={2} justifyContent='space-between'>
          <FilterEvents
            eventType={eventType}
            setEventType={setEventType}
            isParticipating={isParticipating}
            setIsParticipating={setIsParticipating}
          />
          <Box flex={5}>
            <Stack direction='column' spacing={3} mt={2}>
              <>
                <Typography variant='h6'>{`${allEvents.noItems} Results`}</Typography>
                {allEvents.items.map((event: EventItem) => (
                  <CardEvent key={`event-item-${event.id}`} {...event} />
                ))}
              </>
            </Stack>
            <Stack spacing={2} sx={{ marginTop: '40px', bottom: 0 }}></Stack>
          </Box>
        </Stack>
        {allEvents.noItems > 0 && (
          <StyledPagination
            onChange={(_, value) => {
              navigate(`/viewAllEvents/${value}`);
            }}
            count={totalNumberOfPages(allEvents.noItems)}
            defaultPage={1}
            siblingCount={1}
            page={parseInt(pageId)}
          />
        )}
      </StyledBoxAllEvents>
    </Container>
  );
};
