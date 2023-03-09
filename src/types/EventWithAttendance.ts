import { defaultEventItem, EventItem } from './EventItem';

export interface EventWithAttendance{
  attending: boolean,
  event: EventItem;
};

export const defaultEventWithAttendance = {
  attending: false,
  event: defaultEventItem
};