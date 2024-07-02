import { GET } from './route';

describe('API route /api/calendars/{calendarId}/events', () => {
  test('Should return a debug json object', async () => {
    const response = await GET();
    expect(await response.json()).toMatchObject({
      data: { debug: 'Jan' },
    });
    expect(response.status).toBe(200);
  });
});
