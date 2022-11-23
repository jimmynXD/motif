import SelectInput from "ink-select-input"
import { Text, Box } from "ink"
import { FC } from "react"
import { Banner } from "./Banner"

interface Props {
  isSelected?: boolean
  label: string
}

type SelectProps = {
  label: string
  value: string
}

interface SelectInterface {
  items: SelectProps[]
}

const CustomItem: FC<Props> = ({ isSelected = false, label }) => (
  <Text color={isSelected ? "redBright" : undefined}>{label}</Text>
)

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Select = ({ items }: SelectInterface) => {
  const handleSelect = ({ label, value }: SelectProps) => {
    return console.log(`Selected ${label} (${value})`)
  }

  return (
    <Box flexDirection="column">
      <Banner />
      <Text color="magentaBright">Choose workspace:</Text>
      <SelectInput
        itemComponent={CustomItem}
        limit={10}
        items={items}
        onSelect={handleSelect}
      />
    </Box>
  )
}
