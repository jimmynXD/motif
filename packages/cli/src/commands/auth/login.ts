/**
 * TODO:
 * AUTH URL
 * Validation step
 * Error handling
 */

import { CliUx, Command, Flags } from "@oclif/core"
import envPaths from "../../env-paths"
import fs from "node:fs/promises"
import path from "node:path"
import { z } from "zod"
const paths = envPaths("motifxd")

export default class Login extends Command {
  static description = "login to motif"

  static examples = [`$ motifxd auth login`]

  static flags = {
    token: Flags.string({
      char: "t",
      description: "add your token",
      required: false,
    }),
  }

  async getAPIKey(): Promise<void> {
    const apiKeyPath = path.join(paths.data, "api-key.json")
    try {
      await fs.stat(apiKeyPath)
      const apiSchema = z.object({
        token: z.string(),
        createdAt: z.string(),
        expiresAt: z.string(),
      })
      const apiFile = await fs.readFile(apiKeyPath, "utf8")
      const apiData = apiSchema.parse(JSON.parse(apiFile))
      const expiresAt = new Date(apiData.expiresAt)
      const now = new Date()
      if (expiresAt < now) {
        this.log("Your token has expired")
        fs.rm(apiKeyPath)
      }
    } catch {
      this.log("no key found.\nGenerating a new key...")
    }
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Login)

    const loginUrl = "https://motifxd.com/login"

    this.getAPIKey()

    if (flags.token) {
      const json = JSON.stringify(
        {
          token: flags.token,
          createdAt: new Date().toLocaleString(),
          expiresAt: new Date(
            Date.now() + 60 * 60 * 1000
          ).toLocaleString(),
        },
        null,
        2
      )
      try {
        await fs.stat(paths.data)
      } catch {
        await fs.mkdir(paths.data)
      }

      const filePath = path.join(paths.data, "api-key.json")
      await fs.writeFile(filePath, json)
      this.log(`generated ${filePath}`)
    } else {
      this.log("redirected to login page")
      CliUx.ux.open(loginUrl)
    }
  }
}
