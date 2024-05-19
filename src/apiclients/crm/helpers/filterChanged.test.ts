import {
  mockLatelyCreatedClient,
  mockLatelyUpdatedClient,
  mockPreviouslyCreatedClient,
  mockPreviouslyUpdatedClient,
} from './filterChanged.mock';
import { ZendeskSellClientType } from '../types/ZendeskSellClientType';
import { filterChanged } from './filterChanged';

describe('should filter for lately created or changed clients', () => {
  test('data contains only new or recently changed items', () => {
    const clientList: ZendeskSellClientType[] = [
      mockPreviouslyCreatedClient,
      mockPreviouslyUpdatedClient,
      mockLatelyCreatedClient,
      mockLatelyUpdatedClient,
    ];

    const filteredClientList: ZendeskSellClientType[] | null = filterChanged(
      clientList,
      '2023-12-01T00:00:00Z',
    );

    expect(filteredClientList).toBeInstanceOf(Array);
    expect(filteredClientList).toHaveLength(2);
  });
});
