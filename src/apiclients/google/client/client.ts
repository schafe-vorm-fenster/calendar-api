import { calendar_v3, google } from 'googleapis';
import { googleAuth } from './auth';

export const calendarApiClient = google.calendar({
  version: 'v3',
  auth: googleAuth,
} as calendar_v3.Options);
