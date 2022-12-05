import { render } from "ink"
import { createElement } from "react"
import type { FC } from "react"
import { TRPCProvider } from "./TRPCProvider"

export interface InkCommandProps<
  A = Record<string, unknown>,
  F = Record<string, unknown>
> {
  args?: A
  flags?: F
}

export type InkCommand<
  A = Record<string, unknown>,
  F = Record<string, unknown>
> = FC<InkCommandProps<A, F>>

export const renderInk = (node: InkCommand, opts: InkCommandProps = {}) => {
  return render(createElement(TRPCProvider, null, createElement(node, opts)))
}
