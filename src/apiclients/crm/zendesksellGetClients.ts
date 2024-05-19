import axios from 'axios';
import { ZendeskSellClient } from './types/ZendeskSellClient';
import { ZendeskSellClientType } from './types/ZendeskSellClientType';
import { filterChanged } from './helpers/filterChanged';

export interface ZendesksellGetClientsQuery {
  changed?: string;
}

export type ZendesksellGetClientsResult = ZendeskSellClientType[] | null;

interface AccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
}

/**
 * Returns clients (contacts with client status) from zendesk sell.
 * @param query: ZendesksellGetClientsQuery
 * @returns ZendeskSellClient[] | null
 */
const zendesksellGetClientsPage = async (
  query: ZendesksellGetClientsQuery,
  page: number = 1,
): Promise<ZendesksellGetClientsResult> => {
  try {
    console.debug(`Execute zendesksell.getClients(page=${page})`);

    const contacts: any = await axios
      .get(process.env.ZENDESKSELL_API_ENDPOINT + '/contacts', {
        params: {
          per_page: 100,
          page: page,
          customer_status: 'current',
          is_organization: true,
        },
        headers: {
          Authorization: 'Bearer ' + process.env.ZENDESKSELL_TOKEN,
        },
      })
      .then(async (response) => {
        const clientList: ZendeskSellClientType[] = response.data.items.map(
          (item: any) => {
            return <ZendeskSellClientType>(
              new ZendeskSellClient(item.data).get()
            );
          },
        );

        // TODO: mybe better fetch all next pages in parrallel?

        if (
          response.data.meta.count > 0 &&
          response.data.meta.links.next_page
        ) {
          let moreClientList: ZendeskSellClientType[] =
            (await zendesksellGetClientsPage(
              query,
              page + 1,
            )) as ZendeskSellClientType[];

          if (moreClientList) {
            // filter clients by changed timestamp
            if (query.changed)
              moreClientList = filterChanged(
                moreClientList,
                query.changed,
              ) as ZendeskSellClientType[];

            return clientList.concat(moreClientList);
          } else {
            if (query.changed) return filterChanged(clientList, query.changed);

            return clientList;
          }
        } else {
          if (query.changed) return filterChanged(clientList, query.changed);
          return clientList;
        }
      })
      .catch(function (error) {
        console.error(error.message);
        throw new Error(error);
      });

    return contacts;
  } catch (error) {
    console.error((error as Error).message);
    return null;
  }
};

export const zendesksellGetClients = async (
  query: ZendesksellGetClientsQuery,
): Promise<ZendesksellGetClientsResult> => {
  return zendesksellGetClientsPage(query, 1);
};
