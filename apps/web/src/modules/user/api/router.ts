import { publicProcedure, router } from "@/meta/api"
import { userProcedure, workspaceProcedure } from "./procedures"
import uniqBy from "lodash.uniqby"
import {
  createWorkspace,
  createWorkspaceInput,
  getWorkspaceBySlug,
  getWorkspaceBySlugInput,
  getWorkspaceInput,
} from "./service"
import { getWorkspace } from "./service"
import { WorkspaceRecord } from "@/db/api"
import { enhanceWithUserWorkspaceRoles } from "./middlewares"
import { z } from "zod"
import { nanoid } from "nanoid"
import { pick } from "remeda"

export const productAnalyticsRouter = router({
  track: publicProcedure
    .input(
      z.object({
        event: z.string(),
        properties: z.record(z.unknown()).default({}).nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return new Promise<void>((resolve, reject) => {
        ctx.mixpanel.track(input.event, { ...input.properties }, (err) => {
          if (err) reject(err)
          resolve()
        })
      })
    }),
})

/**
 * TODO: projectRouter isn't working with projectProcedure
 */
export const projectRouter = router({
  create: userProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.xata.db.Project.create({
        name: input.name,
        slug:
          input.name.replace("'", "").toLowerCase().split(" ").join("-") +
          `-${nanoid()}`,
        workspace: {
          id: input.id,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return res
    }),
  getAllProjectsInWorkspace: userProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const res = await ctx.xata.db.Project.filter({
        workspace: {
          id: input.id,
        },
      }).getAll()

      return res
    }),
  deleteProject: userProcedure
    .input(
      z.object({
        wkspcId: z.string(),
        projectId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.xata.db.Project.deleteOrThrow(input.projectId)
      return pick(res, ["id", "name", "slug"])
    }),
})
export const workspaceRouter = router({
  create: userProcedure
    .input(createWorkspaceInput)
    .mutation(async ({ ctx, input }) => {
      return createWorkspace({ ctx, input })
    }),
  get: workspaceProcedure
    .input(getWorkspaceInput)
    .query(async ({ ctx, input }) => {
      return getWorkspace({ ctx, input })
    }),
  getWithSlug: userProcedure
    .use(enhanceWithUserWorkspaceRoles)
    .input(getWorkspaceBySlugInput)
    .query(({ ctx, input }) => {
      return getWorkspaceBySlug({ ctx, input })
    }),
})

export const userRouter = router({
  me: userProcedure.query(async ({ ctx }) => {
    return ctx.xata.db.nextauth_users.read(ctx.user.id)
  }),
  getAllWorkspaces: userProcedure.query(async ({ ctx }) => {
    const roles = await ctx.xata.db.WorkspaceRole.filter("user.id", ctx.user.id)
      .select(["workspace.*"])
      .getAll()

    const wks = roles
      .map((role) => role.workspace)
      .filter((val) => !!val) as WorkspaceRecord[]

    return uniqBy(wks, "id")
  }),
  getDefaultWorkspace: userProcedure.query(async ({ ctx }) => {
    const defWk = await ctx.xata.db.UserDefaultWorkspace.filter(
      "user.id",
      ctx.user.id
    )
      .select(["workspace.*"])
      .getFirst()

    if (defWk) return defWk.workspace

    return createWorkspace({ ctx, input: { isDefault: true } })
  }),
  createEarlyAccessEntry: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input: { email } }) => {
      return ctx.xata.db.EarlyAccessUser.create({
        email,
      })
    }),
})
