import { ZendeskSellClientType } from '../types/ZendeskSellClientType';

export const mockPreviouslyCreatedClient: ZendeskSellClientType = {
  id: 1001,
  created_at: '2021-01-01T00:00:00Z',
  updated_at: '2022-01-01T00:00:00Z',
  wikidataId: null,
  name: 'Test Client',
  description: 'Test Description',
  website: 'https://test.com',
  calendars: [
    {
      id: '123',
      type: 'google',
    },
  ],
};

export const mockPreviouslyUpdatedClient: ZendeskSellClientType = {
  id: 1002,
  created_at: '2021-01-01T00:00:00Z',
  updated_at: '2022-01-02T00:00:00Z',
  wikidataId: null,
  name: 'Test Client',
  description: 'Test Description',
  website: 'https://test.com',
  calendars: [
    {
      id: '123',
      type: 'google',
    },
  ],
};

export const mockLatelyCreatedClient: ZendeskSellClientType = {
  id: 2001,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  wikidataId: null,
  name: 'Test Client',
  description: 'Test Description',
  website: 'https://test.com',
  calendars: [
    {
      id: '123',
      type: 'google',
    },
  ],
};

export const mockLatelyUpdatedClient: ZendeskSellClientType = {
  id: 2002,
  created_at: '2021-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  wikidataId: null,
  name: 'Test Client',
  description: 'Test Description',
  website: 'https://test.com',
  calendars: [
    {
      id: '123',
      type: 'google',
    },
  ],
};
