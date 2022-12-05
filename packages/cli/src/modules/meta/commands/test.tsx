import { Text } from "ink"
import { FC, Suspense } from "react"
import { trpc, t } from "../../meta/trpc"
import { type InkCommand } from "../../meta/utils"

export const Atom: FC = () => {
  const data = t.test.hello.useQuery({ text: "asdsd" }, { suspense: true })

  console.log("data:", data.data)

  return <Text>{data.data?.greeting}</Text>
}

export const TestCommand: InkCommand = () => {
  return (
    <>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Atom />
      </Suspense>
    </>
  )
}
