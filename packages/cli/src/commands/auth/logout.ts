/**
 * TODO:
 * AUTH URL
 * Validation step
 * Error handling
 */

import { Command } from "@oclif/core"
import envPaths from "../../env-paths"
import fs from "node:fs/promises"
import path from "node:path"
const paths = envPaths("motifxd")

export default class Login extends Command {
  static description = "logout of motif"

  static examples = [`$ motifxd auth logout`]

  static args = []

  async getAPIKey(): Promise<void> {
    const apiKeyPath = path.join(paths.data, "api-key.json")
    try {
      await fs.stat(apiKeyPath)
      fs.rm(apiKeyPath)
      this.log("Successfully logged out")
    } catch {
      this.log("You are not logged in")
    }
  }

  async run(): Promise<void> {
    await this.parse(Login)

    this.getAPIKey()
  }
}
