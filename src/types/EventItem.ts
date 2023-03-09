import { initialDateTime } from '../utils/ObjectUtils';
import { Address } from './Address';
import { EventType } from './EventType';

export interface EventItem {
  readonly id: number,
  readonly eventTypeId: EventType,
  readonly name: string,
  readonly description: string,
  readonly maxNoAttendees: number,
  readonly noAttendees?: number,
  readonly startDate?: Date,
  readonly endDate?: Date,
  readonly address: Address,
  readonly imageData?: string
}

export const defaultEventItem = {
  id: 0,
  eventTypeId: 0,
  name: '',
  description: '',
  maxNoAttendees: 0,
  noAttendees: 0,
  startDate: initialDateTime('start'),
  endDate: initialDateTime('end'),
  address: {
    location: '',
    cityId: 0,
    countryId: 0
  },
  imageData: ''
};