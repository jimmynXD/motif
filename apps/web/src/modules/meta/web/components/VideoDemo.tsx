import clsx from "clsx"
import { FC } from "react"
import YouTube, { YouTubeProps } from "react-youtube"
export const VideoDemo: FC = () => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo()
  }
  return (
    <section className="text-center pt-28">
      <div className="px-4 md:px-0 font-bold tracking-wider text-2xl md:text-3xl">
        Same workflow, better results
      </div>
      <div
        className={clsx(
          "mt-8 relative flex items-center justify-center",
          "flex-col space-y-8",
          "lg:flex-row lg:space-y-0"
        )}
      >
        <div
          id="demo"
          className="w-full md:max-w-[640px] lg:max-w-[800px] xl:max-w-[1000px]"
        >
          <YouTube
            className="youtube-container z-10"
            videoId="w2WsCVYQG0k"
            onReady={onPlayerReady}
          />
        </div>
        <div className="absolute top-12 bottom-12 left-0 right-0 bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500" />
        <div className="absolute left-0 right-0 top-12 bottom-12 z-1 bg-repeat bg-[url('/grid.svg')]" />
      </div>
    </section>
  )
}
