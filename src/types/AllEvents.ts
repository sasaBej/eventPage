import { EventItem } from "./EventItem";

export interface AllEvents{
  readonly noItems: number,
  readonly items: EventItem[],
}