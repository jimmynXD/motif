import { middleware } from "@/meta/api"
import { TRPCError } from "@trpc/server"
import { z } from "zod"

const userSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  image: z.string().optional(),
})

export const isAuthenticated = middleware(async ({ ctx, next }) => {
  if (!ctx.user?.email) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  const user = await ctx.xata.db.nextauth_users
    .filter("email", ctx.user.email)
    .select(["name", "id", "email", "image"])
    .getFirst()

  const parsedUser = userSchema.safeParse(user)
  if (!parsedUser.success) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      user: parsedUser.data,
    },
  })
})

export type UserWorkspaceRole = `${string}:${string}`

export const enhanceWithUserWorkspaceRoles = middleware(
  async ({ ctx, next }) => {
    const user = userSchema.parse(ctx.user)

    const userRolesRes = await ctx.xata.db.WorkspaceRole.filter(
      "user.id",
      user.id
    )
      .select(["workspace.name", "role.name"])
      .getAll()

    const workspaceRoles = userRolesRes.map(
      (userRole): UserWorkspaceRole =>
        `${userRole.workspace?.id}:${userRole.role?.name}`
    )

    return next({
      ctx: {
        user: {
          ...user,
          workspaceRoles,
        },
      },
    })
  }
)

export const userSchemaWithRoles = userSchema.extend({
  workspaceRoles: z.array(z.string()).min(1),
})

export type UserWithRoles = z.infer<typeof userSchemaWithRoles>

export const workspaceBaseInput = z.object({
  id: z.string(),
})

export type WorkspaceBaseInput = z.infer<typeof workspaceBaseInput>

export const hasWorkspaceAccess = middleware(async ({ ctx, next, ...args }) => {
  const user = userSchemaWithRoles.parse(ctx.user)
  const input = workspaceBaseInput.parse(args.input)

  const hasAccess =
    user.workspaceRoles.filter((role) => role.split(":").includes(input.id))
      .length > 0

  if (!hasAccess) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No access to workspace",
    })
  }

  return next({ ctx: { user } })
})
