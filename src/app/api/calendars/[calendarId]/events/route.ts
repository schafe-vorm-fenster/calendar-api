import { createNextHandler } from '@ts-rest/serverless/next';
import { EventsContract } from './events.contract';
import { googleCalendarGetEvents } from '@/apiclients/google/googleCalendarGetEvents';
import { ZodError } from 'zod';
import { handleZodError } from '@/rest/zod-error-handler';
import { FetchEventsResult } from '@/apiclients/google/types/events.types';

const handler = createNextHandler(
  EventsContract,
  {
    getEvents: async ({
      params: { calendarId },
      query: { timeMin, timeMax, updatedMin },
    }) => {
      const apiRequestTimestamp = new Date().toISOString(); // set at the beginning to be static for the whole api

      try {
        const result: FetchEventsResult | null = await googleCalendarGetEvents({
          calendarId,
          timeMin,
          timeMax,
          updatedMin,
        });

        if (result === null || result.results === 0) {
          return {
            status: 200,
            body: {
              status: 204,
              calendarId,
              results: 0,
              timestamp: apiRequestTimestamp,
              data: [],
            },
          };
        }

        return {
          status: 200,
          body: {
            status: 200,
            results: result.data.length,
            calendarId: result.calendarId,
            timestamp: apiRequestTimestamp,
            data: result.data,
          },
        };
      } catch (error: any) {
        if (error instanceof ZodError) {
          return {
            status: 400,
            body: {
              status: 400,
              error: 'Bad Request',
              message: error.errors,
            },
          };
        }
        return {
          status: 500,
          body: {
            status: 500,
            error: 'Internal Server Error',
            message: error.message ?? 'An unexpected error occurred.',
          },
        };
      }
    },
  },
  {
    handlerType: 'app-router',
    responseValidation: false, // as long as google events do not have a zod schema
    errorHandler: handleZodError,
  },
);

export { handler as GET };
