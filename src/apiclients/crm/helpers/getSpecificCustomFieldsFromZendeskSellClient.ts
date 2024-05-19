import { head, keys } from 'lodash';

export type ZendeskSellClientCustomField =
  | 'Google-Kalender-ID #'
  | 'ICS-Kalender-Feed-URL #'
  | 'Tarif'
  | 'Landkreis'
  | 'Wikidata-ID'
  | 'Google-Place-ID';

export const getSpecificCustomFieldsFromZendeskSellClient = (
  json: any,
  fieldNameSword: ZendeskSellClientCustomField,
): string | string[] | null => {
  const customFieldKeys: string[] = keys(json).filter((key) =>
    key.includes(fieldNameSword),
  );

  const customFieldValues: string[] = customFieldKeys.map((key) => {
    return json[key];
  });

  if (fieldNameSword.includes('#')) {
    return customFieldValues.length > 0 ? customFieldValues : null;
  } else {
    return <string>head(customFieldValues) || null;
  }
};
