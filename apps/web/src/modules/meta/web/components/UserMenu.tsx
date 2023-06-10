import { Menu } from "@headlessui/react"
import clsx from "clsx"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Button } from "ui"

export const UserMenu = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const initials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    ?.toUpperCase()

  return (
    <div>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button
            as="button"
            className={clsx(
              "h-8 w-8 flex justify-center items-center rounded-full",
              "bg-purple-500",
              "text-sm font-semibold text-white"
            )}
          >
            {initials}
          </Menu.Button>
        </div>

        <Menu.Items
          className={clsx(
            "absolute right-0 mt-2 min-w-[14rem] rounded-lg shadow-md",
            "ring-1 ring-black dark:ring-white ring-opacity-5 focus:outline-none",
            "bg-white text-sm dark:bg-black"
          )}
        >
          <div className="py-2 flex flex-col">
            <div className="py-2 px-6 text-gray-700 dark:text-gray-300">
              {session?.user?.email}
            </div>
            <Menu.Item>
              <Link
                href="/apps/workspace"
                className={clsx("py-2 px-6 w-full", {
                  "bg-gray-100 dark:bg-gray-50 dark:text-black font-medium":
                    router.asPath.includes("workspace"),
                })}
              >
                Projects
              </Link>
            </Menu.Item>
            <Menu.Item
              as={"div"}
              className={"border-t border-t-gray-300 mt-4 pt-4"}
            >
              <Button
                onPress={() =>
                  session
                    ? signOut({
                        redirect: true,
                        callbackUrl: "/",
                      })
                    : signIn("google", {
                        redirect: true,
                        callbackUrl: "http://localhost:3000/app/workspace",
                      })
                }
                className={clsx(
                  "button-ghost button-sm px-6 py-2 hover:bg-gray-100 w-full justify-start",
                  "dark:text-gray-300 dark:hover:text-black/70"
                )}
              >
                Log out
              </Button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  )
}
