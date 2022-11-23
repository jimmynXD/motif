import Gradient from "ink-gradient"
import BigText from "ink-big-text"
import { FC } from "react"

export const Banner: FC = () => {
  return (
    <Gradient name="retro">
      <BigText
        font="block"
        align="center"
        text="motifXD"
        backgroundColor="magenta"
      />
    </Gradient>
  )
}
