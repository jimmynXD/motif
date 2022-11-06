import type { Endpoint } from "comlink";
import { Message } from "comlink/dist/umd/protocol";

export const uiEndpoint = (): Endpoint => {
  const listeners = new WeakMap();
  let closePluginServiceTriggered = false;

  return {
    postMessage(message, _tranfer) {
      if (closePluginServiceTriggered) {
        return;
      }

      figma.ui.postMessage(message);
      return;
    },
    addEventListener(_type, listener, _options) {
      const l: MessageEventHandler = (pluginMessage: Message, _props) => {
        if (
          pluginMessage.type === "APPLY" &&
          pluginMessage.path.includes("close")
        ) {
          closePluginServiceTriggered = true;
        }

        if ("handleEvent" in listener) {
          listener.handleEvent({ data: pluginMessage } as any);
        } else {
          listener({ data: pluginMessage } as any);
        }
      };

      figma.ui.on("message", l);
      listeners.set(listener, l);
    },
    removeEventListener(_type, listener, _options) {
      const l = listeners.get(listener);
      if (!l) {
        return;
      }

      figma.ui.off("message", l);
    },
  };
};
