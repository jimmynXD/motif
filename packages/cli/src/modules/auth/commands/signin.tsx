import { Text } from "ink"
import { atom, useAtom } from "jotai"
import { FC, Suspense, useEffect, useState } from "react"
import { trpc } from "../../meta/trpc"
import { type InkCommand } from "../../meta/utils"

const test = (text: string) =>
  trpc.test.hello.atomWithQuery((get) => get(atom({ text })))

export const Atom: FC = () => {
  const [data] = useAtom(test("asdasd"))

  return <Text>{data.greeting}</Text>
}

export const SignInCommand: InkCommand = () => {
  return (
    <>
      <Suspense fallback={<Text>Loading...</Text>}>
        <Atom />
      </Suspense>
    </>
  )
}
