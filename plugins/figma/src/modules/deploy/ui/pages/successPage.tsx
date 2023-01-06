/**
 * TODO: Figure out fonts
 */

import { Link } from "react-router-dom"

export const SuccessPage = () => {
  const version = "0.1.0"

  return (
    <main className="flex flex-col h-full">
      <div className="flex-1">
        <section className="pt-12 px-8 flex flex-col items-center text-sm text-xd-primary-black-rgb">
          <div className="w-16">
            <img src={require("../assets/celebrate.svg")} />
          </div>
          <p className="pt-8 text-center">
            Congrats! You have successfully published Version <b>{version}</b>
          </p>
          <div className="pt-12">
            <Link to="/deploy" className="button button-link">
              <span className="material-symbols-rounded">arrow_back</span>
              <span className="flex-1">Go back</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
