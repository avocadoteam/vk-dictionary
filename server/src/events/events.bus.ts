import * as events from 'events';

class ClientCallbackClass extends events.EventEmitter {
  constructor() {
    super();
  }
}

export const EventBus = new ClientCallbackClass();
