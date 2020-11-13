let clientCallbacks: { [name: string]: any } = {};

type CallbackMethod = <M>() => M;

export function clientPerformCallback<T>(perform: (c: CallbackMethod) => T): T {
  const callbacks = (clientCallbacks = clientCallbacks || {});

  const pr: any = perform((): any => null);

  Object.keys(pr).forEach((m) => {
    callbacks[m] = pr[m];
  });

  return callbacks as T;
}

export function initCallbacks(socket: SocketIOClient.Socket) {
  Object.keys(clientCallbacks).forEach((m) => {
    let subscribe: Function = socket['on'];

    subscribe.call(socket, m, function () {
      const cb = clientCallbacks[m];
      if (cb) {
        cb.apply(socket, arguments);
      }
    });
  });
}
