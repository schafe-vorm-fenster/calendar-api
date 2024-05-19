import { ZendeskSellClient } from '../types/ZendeskSellClient';
import { ZendeskSellClientType } from '../types/ZendeskSellClientType';

export const filterChanged = (
  clients: ZendeskSellClientType[],
  changed: string, // ISO-8601
): ZendeskSellClientType[] | null => {
  // timestamp from ISO-8601
  const timestamp = new Date(changed).getTime();

  // filter clients by changed timestamp
  const changedClients: ZendeskSellClientType[] = clients.filter(
    (client: ZendeskSellClientType) => {
      const created = new Date(client.updated_at || '').getTime();
      const updated = new Date(client.created_at || '').getTime();
      return updated > timestamp || created > timestamp;
    },
  );

  return changedClients.length > 0 ? changedClients : null;
};
