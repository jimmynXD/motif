import { Command } from "@oclif/core"
import fs from "node:fs"
import path from "node:path"

export default class Generate extends Command {
  static description = "Generate styles data file"

  static examples = [`$ motifxd generate`]

  async run(): Promise<void> {
    const { args } = await this.parse(Generate)

    const json = JSON.stringify(args, null, 2)

    const filePath = path.join(process.cwd(), "motif-data.json")
    fs.writeFileSync(filePath, json)

    this.log(`generated ${filePath}`)
  }
}
