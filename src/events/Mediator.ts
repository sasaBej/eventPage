import { filter, map, Observable, Subject } from 'rxjs';
import { MediatorEventsIdentifiers } from './EventsIdentifiers';

export type CommandArgument = { [key: string]: any };

interface MediatorCommand {
  eventId: MediatorEventsIdentifiers;
  args: CommandArgument;
}

export class Mediator {
  private readonly subject: Subject<MediatorCommand>;
  private readonly eventsObservables: Map<MediatorEventsIdentifiers, Observable<CommandArgument>>;

  constructor() {
    this.subject = new Subject();
    this.eventsObservables = new Map();

    for (const eventId of Object.values(MediatorEventsIdentifiers)) {
      this.eventsObservables[eventId] = this.subject.pipe(
        filter((command) => command.eventId === eventId),
        map((command) => command.args)
      );
    }
  }

  publish(eventName: MediatorEventsIdentifiers, args?: CommandArgument) {
    this.subject.next({ eventId: eventName, args });
  }

  subscribe(eventName: MediatorEventsIdentifiers, observer: (args: CommandArgument) => void) {
    return this.eventsObservables[eventName].subscribe(observer);
  }
}

export default new Mediator();
