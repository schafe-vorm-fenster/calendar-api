import { http } from 'msw';

export const handlers = [
  http.get(
    'https://www.googleapis.com/calendar/v3/calendars/abc',
    ({ request, params }) => {
      console.log('Handler', request.method, request.url);
      return Response.json({
        id: params.calendarId,
        title: 'Hello world',
      });
    },
  ),

  http.get('https://api.nasa.gov/EPIC/api/natural', ({ request }) => {
    console.log('Handler', request.method, request.url);
    return Response.json({
      id: 'unknown',
      title: 'nasa',
    });
  }),
];
