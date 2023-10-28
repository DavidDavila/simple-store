import {SimpleBehaviorSubject} from 'simple-behavior-subject'

import { extensionInstance } from "../extension/index";
type EventT = {
  type: "AmbarExtension";
  data: Partial<{
    [key in OrderUIT]: {
      tab: string;
      html?: string;
    };
  }>;
};
export enum OrderUIT {
	'create' = 'create',
	'remove' = 'remove',
	'update' = 'update',
}
class EventsClass extends SimpleBehaviorSubject<object> {
  constructor() {
    super({});
  }
  async sendEventUI(order: OrderUIT, json?: any) {
    const event: Partial<EventT> = {
      type: "AmbarExtension",
      data: {
        [order]: {
          tab: "AmbarStore",
          html: order !== OrderUIT.remove && extensionInstance.getHtml(json),
        },
      },
    };
    return window.postMessage(event, "*");
  }
}

const instance: EventsClass = new EventsClass();
export const eventInstance = instance;
