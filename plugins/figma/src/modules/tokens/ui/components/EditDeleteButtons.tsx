import clsx from "clsx"
import { FC } from "react"

export interface EditDeleteButtonsProps {
  left?: boolean
  onClickEdit: () => void
  onClickDelete: () => void
}
export const EditDeleteButtons: FC<EditDeleteButtonsProps> = ({
  left,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <aside
      className={clsx(
        "z-10 absolute inset-y-0",
        "transition-all",
        "flex",
        "group-hover:translate-x-0",
        {
          "right-0 translate-x-full": !left,
          "left-0 -translate-x-full": left,
        }
      )}
    >
      <button
        onClick={onClickEdit}
        className={clsx(
          "flex items-center justify-center h-full px-4",
          "bg-[#8E8E93]"
        )}
      >
        <span className={clsx("material-symbols-rounded", "text-white")}>
          edit
        </span>
      </button>
      <button
        onClick={onClickDelete}
        className={clsx(
          "flex items-center justify-center h-full px-4",
          "bg-[#FF3B30]"
        )}
      >
        <span className={clsx("material-symbols-rounded", "text-white")}>
          delete
        </span>
      </button>
    </aside>
  )
}
