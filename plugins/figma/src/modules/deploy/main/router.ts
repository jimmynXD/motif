import { publicProcedure, router } from "@/meta/main"
import { z } from "zod"
import { genColorTextJson } from "./generateJson"

export const deployRouter = router({
  getProjects: publicProcedure.query(async () => {
    console.log("getProjects")
    return "hello"
  }),
  createProject: publicProcedure
    .input(
      z.object({
        inputValue: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await console.log("createProject", input)
    }),
  updateProject: publicProcedure
    .input(
      z.object({
        inputValue: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await console.log("updateProject", input)
    }),
  deleteProject: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await console.log("deleteProject", input.id)
    }),
  createJson: publicProcedure.mutation(async () => {
    return genColorTextJson()
  }),
})
