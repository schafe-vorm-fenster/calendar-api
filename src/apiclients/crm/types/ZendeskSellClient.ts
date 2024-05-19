import { jsonToZendeskSellClient } from '../helpers/jsonToZendeskSellClient';
import { ZendeskSellClientType } from './ZendeskSellClientType';

export class ZendeskSellClient {
  data?: ZendeskSellClientType | null = null;

  /**
   * Multiple constructors dependend on type.
   * @param article
   */
  constructor(json: any) {
    this.data = jsonToZendeskSellClient(json);
  }

  get(): ZendeskSellClientType | null {
    return this.data || null;
  }
}
