import { createNextHandler } from "@ts-rest/serverless/next";
import { GetEventsContract } from "./get-events.contract";
import { googleCalendarGetEvents } from "@/clients/google/google-calendar-get-events";
import { handleZodError } from "@/rest/zod-error-handler";
import { ReducedGoogleEvent } from "@/clients/google/types/events.types";
import { ErrorSchema } from "@/rest/error.schema";
import { getDataCacheControlHeader } from "@/config/cache-control-header";
import { MateoContactListItem } from "@/clients/mateo/types/mateo-contact-list.types";
import { getMateoContacts } from "@/clients/mateo/mateo-get-contacts";
import { Organizer } from "@/organizer/types/organizer.types";
import { mapToOrganizers } from "@/clients/mateo/helpers/map-to-organizers";
import { Calendar } from "@/calendar/types/calendar.types";
import { transformOrganizersToCalendars } from "@/organizer/helper/transform-organizers-to-calendars";
import { filterCalendarsById } from "@/calendar/helpers/filter-calendars-by-id";
import { getLogger } from "@/logging/logger";
import { apiLoggerCalendars } from "@/logging/loggerApps.config";

const log = getLogger(apiLoggerCalendars.events);

const handler = createNextHandler(
  GetEventsContract,
  {
    "get-events": async (
      { params: { id }, query: { timeMin, timeMax, updatedMin } },
      res
    ) => {
      try {
        log.info(
          { id, timeMin, timeMax, updatedMin },
          `Fetching events for calendar ${id}`
        );

        // set response timestamp
        const timestamp = new Date().toISOString();

        // validate calendar id and lookup organizer data
        const mateoContacts: MateoContactListItem[] = await getMateoContacts();
        const organizers: Organizer[] = mapToOrganizers(mateoContacts);
        const calendars: Calendar[] =
          transformOrganizersToCalendars(organizers);
        const calendar: Calendar | null = filterCalendarsById(calendars, id);

        if (!calendar) {
          log.warn({ data: { id } }, `Calendar not found`);
          return {
            status: 404,
            body: {
              status: 404,
              error: "Not Found",
            } as ErrorSchema,
          };
        }

        // set default values for timeMin and timeMax
        if (!timeMin) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          timeMin = today.toISOString();
        }
        if (!timeMax) {
          const futureDate = new Date(
            new Date().getTime() + 90 * 24 * 60 * 60 * 1000
          );
          futureDate.setHours(0, 0, 0, 0);
          timeMax = futureDate.toISOString();
        }

        // fetch the actual events
        const result: ReducedGoogleEvent[] | null =
          await googleCalendarGetEvents({
            calendarId: id,
            timeMin,
            timeMax,
            updatedMin,
          });

        if (!result || result.length === 0) {
          return {
            status: 200,
            body: {
              status: 204,
              results: 0,
              timestamp: timestamp,
              data: [],
            },
          };
        }

        result.forEach((event) => {
          event.organizer = {
            id: calendar?.organizer?.id as string,
            email: event?.organizer?.email ?? event.organizer?.id ?? undefined,
            displayName:
              calendar?.organizer?.name ??
              event.organizer?.displayName ??
              ("" as string),
          };
        });

        // Set cache control header
        res.responseHeaders.set("Cache-Control", getDataCacheControlHeader());

        return {
          status: 200,
          body: {
            status: 200,
            results: result.length,
            timestamp: timestamp,
            data: result,
          },
        };
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.";
        return {
          status: 500,
          body: {
            status: 500,
            error: "Internal Server Error",
            message: errorMessage,
          } as ErrorSchema,
        };
      }
    },
  },
  {
    jsonQuery: true,
    responseValidation: true,
    handlerType: "app-router",
    errorHandler: handleZodError,
  }
);

export { handler as GET };
