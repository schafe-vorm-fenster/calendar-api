import { vi, describe, expect, test } from 'vitest';

import { GET } from './route';
import { ApiErrorResponse } from '../../api.types';

describe('API route /api/calendars/{calendarId}', () => {
  vi.mock('@/apiclients/google/googleCalendarGetCalendar', () => ({
    googleCalendarGetCalendar: vi
      .fn()
      .mockRejectedValueOnce(new Error('some error')),
  }));

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('Should return 500 for an exception while fetching data', async () => {
    const response = await GET(undefined, {
      params: { calendarId: 'error' },
    });

    expect(response.status).toBe(500);

    const body: ApiErrorResponse = await response.json();

    expect(body.status).toBe(500);
    expect(body.error).toBeTypeOf('string');
  });
});
