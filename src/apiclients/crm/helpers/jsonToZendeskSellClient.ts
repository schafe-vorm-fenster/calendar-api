import {
  ZendeskSellClientCalendar,
  ZendeskSellClientType,
} from '../types/ZendeskSellClientType';
import { getSpecificCustomFieldsFromZendeskSellClient } from './getSpecificCustomFieldsFromZendeskSellClient';

/**
 * Casts a json to ZendeskSellClientType
 * @param json
 * @returns zendeskSellClient : ZendeskSellClientType
 */
export const jsonToZendeskSellClient = (
  json: any,
): ZendeskSellClientType | null => {
  if (!json || !json.id) return null;

  const googleCalendars: string[] =
    <string[]>(
      getSpecificCustomFieldsFromZendeskSellClient(
        json.custom_fields,
        'Google-Kalender-ID #',
      )
    ) || [];
  const googleCalendarRefs: ZendeskSellClientCalendar[] = googleCalendars.map(
    (item) => {
      const calRef: ZendeskSellClientCalendar = {
        id: item,
        type: 'google',
      };
      return calRef;
    },
  );
  const icsCalendars: string[] =
    <string[]>(
      getSpecificCustomFieldsFromZendeskSellClient(
        json.custom_fields,
        'ICS-Kalender-Feed-URL #',
      )
    ) || [];
  const icsCalendarRefs: ZendeskSellClientCalendar[] = icsCalendars.map(
    (item) => {
      const icsRef: ZendeskSellClientCalendar = {
        id: item,
        type: 'ical',
      };
      return icsRef;
    },
  );

  const allCalendars: ZendeskSellClientCalendar[] =
    googleCalendarRefs.concat(icsCalendarRefs);

  const data: ZendeskSellClientType = {
    id: json.id,
    // isClient: json?.customer_status === 'current' ? true : false,
    // currentTarif:
    //   <string>(
    //     getSpecificCustomFieldsFromZendeskSellClient(
    //       json.custom_fields,
    //       'Tarif',
    //     )
    //   ) || null,
    // isOrganization: json?.is_organization ? true : false,
    // parent_organization_id: json?.parent_organization_id,
    name: <string>json?.name || 'unknown',
    // address: {
    //   address: json?.address?.line2
    //     ? json?.address?.line1 + ', ' + json?.address?.line2
    //     : json?.address?.line1,
    //   zip: json?.address?.postal_code,
    //   city: json?.address?.city,
    //   county: <string>(
    //     getSpecificCustomFieldsFromZendeskSellClient(
    //       json.custom_fields,
    //       'Landkreis',
    //     )
    //   ),
    //   state: json?.address?.state,
    //   country: json?.address?.country,
    // },
    // category: json?.industry, // TODO: map to google classify categories
    // tags: json?.tags || [],
    description: json?.description,
    website: json?.website,
    // email: json?.email,
    // twitter: json?.twitter,
    // phone: json?.mobile || json?.phone,
    calendars: allCalendars.length > 0 ? allCalendars : [],
    wikidataId:
      <string>(
        getSpecificCustomFieldsFromZendeskSellClient(
          json.custom_fields,
          'Wikidata-ID',
        )
      ) || null,
    created_at: json?.created_at || '',
    updated_at: json?.updated_at || '',
  };
  return data;
};
