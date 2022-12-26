declare module "use-analytics" {
  import { ReactNode, type FC } from "react"
  import { AnalyticsInstance } from "analytics"

  export const AnalyticsProvider: FC<{
    children: ReactNode
    instance: AnalyticsInstance
  }>
  export const useAnalytics = () => AnalyticsInstance
}
