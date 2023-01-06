import { FC, ReactNode } from "react"
export interface PageLayoutProps {
  bottomNav?: ReactNode
  children: ReactNode
}
export const PageLayout: FC<PageLayoutProps> = ({ bottomNav, children }) => {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex-1 bg-[#F2F2F7] dark:bg-black">{children}</div>
      {bottomNav}
    </main>
  )
}
