import { describe, expect, test } from 'vitest';
import { ZendeskSellClientType } from '../types/ZendeskSellClientType';
import { jsonToZendeskSellClient } from './jsonToZendeskSellClient';
import {
  zendeskSellClientWithCounty,
  zendeskSellClientWithOneGoogleCalendar,
  zendeskSellClientWithTarif,
  zendeskSellClientWithTwoGoogleCalendars,
  zendeskSellClientWithWikidataId,
} from '../mocks/zendeskSellClients.mock';

// TODO: expect match by json schema based on typescipt interface https://stackoverflow.com/questions/30856758/test-if-an-object-conforms-to-an-interface-in-typescript

describe('should transform a zendesk sell json into a typed ZendeskSellClientType', () => {
  test('data contains one calendar', () => {
    const transformedItem: ZendeskSellClientType = <ZendeskSellClientType>(
      jsonToZendeskSellClient(zendeskSellClientWithOneGoogleCalendar)
    );
    expect(transformedItem).toHaveProperty('calendars');
    expect(transformedItem.calendars).toHaveLength(1);
  });

  test('data contains two calendars', () => {
    const transformedItem: ZendeskSellClientType = <ZendeskSellClientType>(
      jsonToZendeskSellClient(zendeskSellClientWithTwoGoogleCalendars)
    );
    expect(transformedItem).toHaveProperty('calendars');
    expect(transformedItem.calendars).toHaveLength(2);
  });

  test('data contains a wikidataId', () => {
    const transformedItem: ZendeskSellClientType = <ZendeskSellClientType>(
      jsonToZendeskSellClient(zendeskSellClientWithWikidataId)
    );
    expect(transformedItem).toHaveProperty('wikidataId', 'Q61221998');
  });
});
