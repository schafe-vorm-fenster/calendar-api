import { getSpecificCustomFieldsFromZendeskSellClient } from './getSpecificCustomFieldsFromZendeskSellClient';
import {
  customFieldsWithFullData,
  customFieldsWithNoData,
  customFieldsWithSomeData,
} from '../mocks/zendeskSellClientCustomFields.mock';

describe('should extract values from zendesk sell client custom fields', () => {
  test('could extract one google calendar entry', () => {
    const transformedItem: string[] = <string[]>(
      getSpecificCustomFieldsFromZendeskSellClient(
        customFieldsWithSomeData,
        'Google-Kalender-ID #',
      )
    );
    expect(transformedItem).toHaveLength(1);
    expect(transformedItem[0]).toEqual('calendarId1@group.calendar.google.com');
  });

  test('could extract all google calendar entries', () => {
    const transformedItem: string[] = <string[]>(
      getSpecificCustomFieldsFromZendeskSellClient(
        customFieldsWithFullData,
        'Google-Kalender-ID #',
      )
    );
    expect(transformedItem).toHaveLength(5);
    expect(transformedItem[0]).toEqual('calendarId1@group.calendar.google.com');
    expect(transformedItem[1]).toEqual('calendarId2@group.calendar.google.com');
    expect(transformedItem[2]).toEqual('calendarId3@group.calendar.google.com');
    expect(transformedItem[3]).toEqual('calendarId4@group.calendar.google.com');
    expect(transformedItem[4]).toEqual('calendarId5@group.calendar.google.com');
  });

  test('could extract one ics calendar entry', () => {
    const transformedItem: string[] = <string[]>(
      getSpecificCustomFieldsFromZendeskSellClient(
        customFieldsWithSomeData,
        'ICS-Kalender-Feed-URL #',
      )
    );
    expect(transformedItem).toHaveLength(1);
    expect(transformedItem[0]).toEqual('https://somecalendar-one.ics');
  });

  test('could extract all ics calendar entries', () => {
    const transformedItem: string[] = <string[]>(
      getSpecificCustomFieldsFromZendeskSellClient(
        customFieldsWithFullData,
        'ICS-Kalender-Feed-URL #',
      )
    );
    expect(transformedItem).toHaveLength(5);
    expect(transformedItem[0]).toEqual('https://somecalendar-one.ics');
    expect(transformedItem[1]).toEqual('https://somecalendar-two.ics');
    expect(transformedItem[2]).toEqual('https://somecalendar-three.ics');
    expect(transformedItem[3]).toEqual('https://somecalendar-four.ics');
    expect(transformedItem[4]).toEqual('https://somecalendar-five.ics');
  });

  test('could extract starter tarif', () => {
    const transformedItem: string = <string>(
      getSpecificCustomFieldsFromZendeskSellClient(
        customFieldsWithSomeData,
        'Tarif',
      )
    );
    expect(transformedItem).toEqual('Starter');
  });

  test('could extract county', () => {
    const transformedItem: string = <string>(
      getSpecificCustomFieldsFromZendeskSellClient(
        customFieldsWithSomeData,
        'Landkreis',
      )
    );
    expect(transformedItem).toEqual('Vorpommern-Greifswald');
  });

  test('could extract wikidata id', () => {
    const transformedItem: string = <string>(
      getSpecificCustomFieldsFromZendeskSellClient(
        customFieldsWithSomeData,
        'Wikidata-ID',
      )
    );
    expect(transformedItem).toEqual('Q0897654');
  });

  test('could extract google place id', () => {
    const transformedItem: string = <string>(
      getSpecificCustomFieldsFromZendeskSellClient(
        customFieldsWithSomeData,
        'Google-Place-ID',
      )
    );
    expect(transformedItem).toEqual('aSDFGHJKL3456sdfHJ');
  });
});

describe('should return null for missing zendesk sell client custom fields', () => {
  test('null for no google calendar entry', () => {
    const transformedItem: string[] = <string[]>(
      getSpecificCustomFieldsFromZendeskSellClient(
        customFieldsWithNoData,
        'Google-Kalender-ID #',
      )
    );
    expect(transformedItem).toBeNull();
  });

  test('null for no ics calendar entry', () => {
    const transformedItem: string[] = <string[]>(
      getSpecificCustomFieldsFromZendeskSellClient(
        customFieldsWithNoData,
        'ICS-Kalender-Feed-URL #',
      )
    );
    expect(transformedItem).toBeNull();
  });

  test('null for no tarif', () => {
    const transformedItem: string = <string>(
      getSpecificCustomFieldsFromZendeskSellClient(
        customFieldsWithNoData,
        'Tarif',
      )
    );
    expect(transformedItem).toBeNull();
  });

  test('null for no county', () => {
    const transformedItem: string = <string>(
      getSpecificCustomFieldsFromZendeskSellClient(
        customFieldsWithNoData,
        'Landkreis',
      )
    );
    expect(transformedItem).toBeNull();
  });

  test('null for no wikidata id', () => {
    const transformedItem: string = <string>(
      getSpecificCustomFieldsFromZendeskSellClient(
        customFieldsWithNoData,
        'Wikidata-ID',
      )
    );
    expect(transformedItem).toBeNull();
  });

  test('null for no google place id', () => {
    const transformedItem: string = <string>(
      getSpecificCustomFieldsFromZendeskSellClient(
        customFieldsWithNoData,
        'Google-Place-ID',
      )
    );
    expect(transformedItem).toBeNull();
  });
});
