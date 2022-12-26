import Analytics, { AnalyticsPlugin } from "analytics"
import { trpcProxyClient, type TRPCProxyClient } from "./trpc"

export interface EventPayload {
  event: string
  properties: Record<string, unknown>
  userId?: string
}

export const productAnalytics = (t: TRPCProxyClient): AnalyticsPlugin => {
  return {
    name: "product-analytics-plugin",
    config: {},
    track: async ({ payload }: { payload: EventPayload }) => {
      await t.api.analytics.track.mutate({
        event: payload.event,
        properties: {
          device: "figma-plugin",
          ...payload.properties,
        },
      })
    },
  }
}

export const analytics = Analytics({
  app: "motifxd-figma",
  plugins: [productAnalytics(trpcProxyClient)],
})
