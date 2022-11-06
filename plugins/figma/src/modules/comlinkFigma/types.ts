import { type WireValueType } from "comlink/dist/umd/protocol"

export interface PluginMessage {
  id: string
  type: "APPLY"
  path: string[]
  argumentList: {
    type: WireValueType
    value: unknown
  }[]
}
