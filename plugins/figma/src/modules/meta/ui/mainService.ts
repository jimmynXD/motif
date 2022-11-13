import * as Comlink from "comlink"
import { mainEndpoint } from "@labxd/comlink-figma"
import { LinkedMainServices } from "@/meta/main"

export const mainServices = Comlink.wrap<LinkedMainServices>(
  mainEndpoint({
    pluginId: "sdhhskdjh980uhi",
  })
)

export default mainServices
