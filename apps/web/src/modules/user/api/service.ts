import { Workspace } from "@/db/api"
import { ServiceHandler, ServiceHandlerParams } from "@/meta/api"
import z from "zod"
import { nanoid } from "nanoid"
import { TRPCError } from "@trpc/server"
import { UserContext, UserContextBase } from "./types"
import { workspaceBaseInput } from "./middlewares"

export const createWorkspaceInput = z
  .object({
    name: z.string().optional(),
    isDefault: z.boolean().optional(),
  })
  .optional()

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceInput>

export const createWorkspace: ServiceHandler<
  CreateWorkspaceInput,
  Workspace,
  UserContextBase
> = async ({ ctx, input }) => {
  const workspaceName =
    input?.name ?? `${ctx.user.name?.split(" ")[0]}'s workspace`

  const currDate = new Date()
  const dates = {
    createdAt: currDate,
    updatedAt: currDate,
  }

  const workspace = await ctx.xata.db.Workspace.create({
    name: workspaceName.toLowerCase(),
    slug:
      workspaceName.replace("'", "").toLowerCase().split(" ").join("-") +
      `-${nanoid()}`,
    ...dates,
  })

  const workspaceOwnerRole = await ctx.xata.db.WorkspaceRoleType.filter(
    "name",
    "OWNER"
  ).getFirst()

  if (!workspaceOwnerRole) {
    throw new TRPCError({ code: "BAD_REQUEST" })
  }

  await ctx.xata.db.WorkspaceRole.create({
    user: {
      id: ctx.user.id,
    },
    workspace: {
      id: workspace.id,
    },
    role: {
      id: workspaceOwnerRole.id,
    },
    ...dates,
  })

  if (input?.isDefault) {
    await ctx.xata.db.UserDefaultWorkspace.create({
      user: {
        id: ctx.user.id,
      },
      workspace: {
        id: workspace.id,
      },
      ...dates,
    })
  }

  return workspace
}

export const getWorkspaceInput = workspaceBaseInput

export type GetWorkspaceInput = z.infer<typeof getWorkspaceInput>

export const getWorkspace = async ({
  ctx,
  input: { id },
}: ServiceHandlerParams<GetWorkspaceInput, UserContext>) => {
  const workspaceRepository = ctx.xata.db.Workspace

  const workspace = await workspaceRepository.read(id)

  if (!workspace) {
    throw new TRPCError({ code: "NOT_FOUND" })
  }

  return workspace
}

export const getWorkspaceBySlugInput = z.object({
  slug: z.string(),
})

export type GetWorkspaceBySlugInput = z.infer<typeof getWorkspaceBySlugInput>

export const getWorkspaceBySlug = async ({
  ctx,
  input: { slug },
}: ServiceHandlerParams<GetWorkspaceBySlugInput, UserContext>) => {
  const workspace = await ctx.xata.db.Workspace.filter("slug", slug).getFirst()

  if (!workspace) {
    throw new TRPCError({ code: "NOT_FOUND" })
  }

  const hasAccess =
    ctx.user.workspaceRoles.filter((role) =>
      role.split(":").includes(workspace.id)
    ).length > 0

  if (!hasAccess) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No access to workspace",
    })
  }

  return workspace
}
