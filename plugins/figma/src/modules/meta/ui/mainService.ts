import { loadMainServices } from "@labxd/comlink-figma"
import { LinkedMainServices } from "@/meta/main"

export const mainServices = loadMainServices<LinkedMainServices>({
  pluginId: "1176582292266618363",
})

export default mainServices
