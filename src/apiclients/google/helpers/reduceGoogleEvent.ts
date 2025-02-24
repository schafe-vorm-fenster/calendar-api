// const to map google calendar object to svf calebndar object

import { GoogleEvent, ReducedGoogleEvent } from '../types/events.types';

export const reduceGoogleEvent = (
  googleEvent: GoogleEvent,
): ReducedGoogleEvent => {
  return {
    id: googleEvent.id,
    kind: googleEvent.kind,
    created: googleEvent.created,
    updated: googleEvent.updated,
    summary: googleEvent.summary,
    description: googleEvent.description,
    location: googleEvent.location,
    organizer: {
      email: googleEvent.organizer?.email,
    },
    start: googleEvent.start,
    end: googleEvent.end,
    sequence: googleEvent.sequence,
    attachments: googleEvent.attachments,
    recurrence: googleEvent.recurrence,
    recurringEventId: googleEvent.recurringEventId,
    status: googleEvent.status,
  };
};
