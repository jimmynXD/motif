import { FloatingMenu, FloatingModal } from "@/tokens/ui/components"
import clsx from "clsx"
import { FC } from "react"
export const Footer: FC = () => {
  return (
    <footer
      className={clsx(
        "flex items-center justify-between fixed bottom-0 left-0 right-0",
        "h-16 bg-[#f1eddd]",
        "text-xd-secondary-black-rgb"
      )}
    >
      <span className="flex flex-1 justify-center">
        <FloatingModal heading="Color Token" icon="palette">
          <div>stuff</div>
        </FloatingModal>
      </span>

      <span className="flex flex-1 justify-center">
        <FloatingMenu label="Text Styles" />
      </span>
    </footer>
  )
}
