import { Command } from "@oclif/core"
import { createElement } from "react"
import { render } from "ink"
import { Select } from "../../modules/Select"
export default class Init extends Command {
  static description = "Initialize your project"

  static examples = ["$ motifxd init"]

  static args = []

  async run(): Promise<void> {
    await this.parse(Init)
    render(createElement(Select))
  }
}
