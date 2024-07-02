import { vi, describe, expect, test } from 'vitest';

import { GET } from './route';
import { CalendarsApiResponseItem } from '../calendars-api.types';
import { ApiErrorResponse } from '../../api.types';

describe('API route /api/calendars/{calendarId}', () => {
  vi.mock('@/apiclients/google/googleCalendarGetCalendar', () => ({
    googleCalendarGetCalendar: vi
      .fn()
      .mockReturnValueOnce({
        id: 'id@group.calendar.google.com',
        summary: 'Schafe vorm Fenster',
        description: 'Lorem Ipsum".',
        tags: ['Tag1'],
        scopes: ['Scope1'],
        url: '',
      })
      .mockReturnValueOnce(null),
  }));

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('Should return a calendar object based on google api mock', async () => {
    const response = await GET(undefined, {
      params: { calendarId: 'found' },
    });

    expect(response.status).toBe(200);

    const body: CalendarsApiResponseItem = await response.json();

    expect(body.status).toBe(200);
    expect(body.data.id).toBeTypeOf('string');
    expect(body.data.summary).toBeTypeOf('string');
    expect(body.data.description).toBeTypeOf('string');
    expect(body.data.url).toBeTypeOf('string');
    expectTypeOf(body.data.tags as string[]).toBeArray();
    expectTypeOf(body.data.scopes as string[]).toBeArray();
  });

  test('Should return a 404 for not found calendar', async () => {
    const response = await GET(undefined, {
      params: { calendarId: 'notfound' },
    });

    expect(response.status).toBe(404);

    const body: ApiErrorResponse = await response.json();

    expect(body.status).toBe(404);
    expect(body.error).toBeTypeOf('string');
  });
});
