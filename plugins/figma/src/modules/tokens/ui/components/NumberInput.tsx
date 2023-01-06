import clsx from "clsx"
import { FC, ReactNode } from "react"

export interface NumberInputProps {
  icon?: ReactNode
  value: number
  setValue: (value: number) => void
}
export const NumberInput: FC<NumberInputProps> = ({
  icon,
  value,
  setValue,
}) => {
  const onClickMinus = () => {
    setValue(value - 1)
  }
  const onClickAdd = () => {
    setValue(value + 1)
  }
  return (
    <div
      className={clsx(
        "relative flex-1 flex items-center",
        "border border-[#E6E6E6] rounded-sm",
        "dark:border-dark-border "
      )}
    >
      <button
        onClick={onClickMinus}
        className={clsx(
          "absolute inset-y-0 left-0 w-8 h-8 rounded-l-sm bg-[#F5F5F5]",
          "dark:bg-[#383838] dark:text-white"
        )}
      >
        <span className="material-symbols-rounded leading-none text-lg">
          remove
        </span>
      </button>
      <div className="flex-1 flex justify-center items-center">
        <span className="absolute inset-y-0 left-10 flex items-center">
          {icon}
        </span>
        <input
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          type="number"
          className={clsx(
            "w-full pl-1 pr-0 text-center py-0 h-8",
            "appearance-none border-none focus:ring-0 focus:outline-none",
            "font-display font-semibold",
            "dark:bg-dark-input-bg dark:text-white"
          )}
        />
      </div>

      <button
        onClick={onClickAdd}
        className={clsx(
          "absolute inset-y-0 right-0 w-8 h-8 rounded-r-sm bg-[#F5F5F5]",
          "dark:bg-[#383838] dark:text-white"
        )}
      >
        <span className="material-symbols-rounded leading-none text-lg">
          add
        </span>
      </button>
    </div>
  )
}
