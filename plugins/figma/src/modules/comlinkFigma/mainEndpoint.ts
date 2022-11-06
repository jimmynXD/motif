import type { Endpoint } from "comlink";
import { Message } from "comlink/dist/umd/protocol";

interface Options {
  targetOrigin?: string;
  pluginId?: string;
}

export interface PluginMessage {
  id: string
  type: "APPLY"
  path: string[]
  argumentList: {
    type: "RAW"
    value: unknown
  }[]
}

export const mainEndpoint = ({
  targetOrigin = "*",
  pluginId,
}: Options = {}): Endpoint => {
  const listeners = new WeakMap();

  return {
    postMessage(message: Message, transfer) {
      parent.postMessage(
        { pluginMessage: message, pluginId },
        targetOrigin,
        transfer
      );
    },
    addEventListener(_type, listener, options) {
      const l = (event: MessageEvent<{ pluginMessage: any }>) => {
        if ("handleEvent" in listener) {
          listener.handleEvent({
            data: event.data.pluginMessage,
          } as MessageEvent);
        } else {
          listener({ data: event.data.pluginMessage } as MessageEvent);
        }
      };

      window.addEventListener("message", l, options);
      listeners.set(listener, l);
    },
    removeEventListener(_type, listener, options) {
      const l = listeners.get(listener);
      if (!l) {
        return;
      }

      window.removeEventListener("message", l, options);
    },
  };
};

