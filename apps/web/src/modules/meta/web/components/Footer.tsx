import Link from "next/link"
import { FC } from "react"
import DiscordLogo from "../assets/discord-mark-white.png"
import SpotifyImage from "../assets/Spotify_Icon_RGB_White.png"
import Image from "next/image"
import { HighlightButton, HightlightVariant } from "./HightlightButton"
import clsx from "clsx"

export const Footer: FC = () => {
  const FOOTER_ARRAY = [
    {
      href: "https://discord.gg/2JzNrn4P6N",
      left: (
        <span className="w-6">
          <Image alt="discord" src={DiscordLogo} />
        </span>
      ),
      children: "Join our Discord",
    },
    {
      href: "https://www.youtube.com/channel/UCWvxvCuwAcVeCSt5tsLBwwA",
      left: (
        <span className="material-symbols-outlined text-2xl">
          youtube_activity
        </span>
      ),
      children: "Watch us on YouTube",
    },
    {
      href: "https://open.spotify.com/show/00xrBv5KybQqy9fCJNNYRb?si=474f888b490e4226",
      left: (
        <span className="w-6">
          <Image alt="spotify" src={SpotifyImage} />
        </span>
      ),
      children: "Hear us on Spotify",
    },
  ]
  return (
    <footer className="pt-12 pb-8 px-4">
      <div className="page-max-xl">
        <ul
          className={clsx(
            "space-y-6",
            "md:flex md:space-y-0 md:space-x-4 lg:space-x-12"
          )}
        >
          {FOOTER_ARRAY.map((item, index) => (
            <li key={index} className="md:flex-1">
              <Link passHref href={item.href} target="_blank">
                <HighlightButton
                  left={item.left}
                  className={"h-full w-full"}
                  variant={HightlightVariant.GREEN}
                >
                  <span className="flex-1">{item.children}</span>
                </HighlightButton>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
