import { TopNav } from "@/meta/ui"
import { PageLayout } from "@/tokens/ui"
import clsx from "clsx"
import { ReactNode } from "react"
import { FC } from "react"

interface SectionProps {
  children: ReactNode
  header: ReactNode
}

export const Section: FC<SectionProps> = ({ children, header }) => {
  return (
    <section className="space-y-1 pt-8 first:pt-0 dark:text-white">
      <h4 className="font-bold">{header}</h4>
      <div className="text-sm inline-block">{children}</div>
    </section>
  )
}

export const InstructionPage: FC = () => {
  const olClass = "list-decimal pl-4"
  const ulClass = "list-disc pl-4"
  return (
    <PageLayout>
      <TopNav noAction>
        <div className="pt-8 px-4">
          <Section header="Adding New Tokens">
            <div className="pb-2">
              Add tokens from anywhere in your figma file. Our plugin will
              automatically add it to your custom Design System page.
            </div>
            <ol className={clsx(olClass)}>
              <li>
                Navigate to either the <b>Color</b> or <b>Text</b> tab at the
                bottom of the Tokens page.
              </li>
              <li>
                Use the{" "}
                <span className="w-4 h-4 text-center bg-xd-primary-purple-700 rounded-full text-base material-symbols-rounded text-white leading-none">
                  add
                </span>{" "}
                to <b>add</b> a new token.
              </li>
              <li>
                Give the token a name<sup>*</sup>
              </li>
              <li>
                Select the token properties
                <ul className={clsx(ulClass)}>
                  <li>
                    For <b>Color</b>, select a color from the color picker.
                  </li>

                  <li>
                    For <b>Text</b>, select the font family, font weight, font
                    size, and line height (usually 1.5x of font size).
                  </li>
                </ul>
              </li>
              <li>
                Press the{" "}
                <span className="material-symbols-rounded text-base text-xd-primary-purple-700">
                  save
                </span>{" "}
                button at the top right to save.
              </li>
            </ol>
          </Section>
          <Section header="Deleting Tokens">
            <ol className={clsx(olClass)}>
              <li>
                Navigate to either the <b>Color</b> or <b>Text</b> tab at the
                bottom of the Tokens page.
              </li>
              <li>
                Hover over the token you want to delete.
                <ul className={clsx(ulClass)}>
                  <li>
                    For <b>Color</b>, hover over the token swatch and press the
                    delete icon.
                  </li>
                  <li>
                    For <b>Text</b>, hover over the token name and press the
                    delete icon
                  </li>
                </ul>
              </li>
            </ol>
          </Section>
          <Section header="Editing Tokens">
            <div>
              The plugin will not allow duplicate names. Instead, it will update
              that token. Treat it the same as adding a new token.
            </div>
          </Section>
          <Section header="Visualize your tokens">
            Our plugin creates a custom <b>Design System</b> page, located at
            the top of the Pages list on the left sidebar. Here, you can
            visualize all your tokens in one place.{" "}
            <i>
              Note: Use the plugin to do the actual adding and editing of the
              tokens.
            </i>
          </Section>
          <Section header="Naming your tokens">
            To play nice for the developers, we will use dashes in place of
            spaces and slashes. For example, instead of &quot;primary
            purple&quot;, we will use &quot;primary-purple&quot;. Instead of
            &quot;primary/purple&quot;, we will use &quot;primary-purple&quot;.{" "}
            <i>Note: When editing, use the name with dashes.</i>
          </Section>
        </div>
      </TopNav>
    </PageLayout>
  )
}
