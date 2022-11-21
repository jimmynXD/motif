import { FC, ReactNode } from "react"

export interface EmptySectionInterface {
  children: ReactNode
  imgSrc: string
}

export const EmptySection: FC<EmptySectionInterface> = ({
  children,
  imgSrc,
}) => {
  return (
    <div className="flex flex-col items-center pt-8">
      <span>
        <img src={imgSrc} />
      </span>
      <p className="text-sm font-medium pt-5">{children}</p>
    </div>
  )
}
