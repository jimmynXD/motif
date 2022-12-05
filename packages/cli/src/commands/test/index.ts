import { Command } from "@oclif/core"
import { TestCommand } from "../../modules/meta/commands/test"
import { renderInk } from "../../modules/meta/utils"

export default class Test extends Command {
  static description = "Test CLI"

  static examples = ["$ motifxd test"]

  static args = []

  async run(): Promise<void> {
    renderInk(TestCommand)
  }
}
