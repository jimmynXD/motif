// capitalize first letter of word
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// convert rgb to hex
export const rgbToHex = (r: number, g: number, b: number) => {
  const bin = (r << 16) | (g << 8) | b
  return (function (h) {
    return new Array(7 - h.length).join("0") + h
  })(bin.toString(16).toUpperCase())
}

// create rgb values
export const rgbValue = (value: number) => Math.round(value * 255)
// create reverse rgb values
export const reverseRgbValue = (value: number) => value / 255

export const DSName = () => {
  const fileKey = figma.fileKey?.toString()
  const DSName = "Design System (" + fileKey + ")"
  const DSNameNoKey = "Design System (master - motifXD)"
  if (!fileKey) return DSNameNoKey

  return DSName
}

export const findDSPage = () => {
  const dsNode = figma.root.findChild(
    (item) => item.name === (DSName() as string)
  ) as PageNode

  return dsNode
}

export const findSection = (sectionName: string) => {
  const isSection = (val?: SceneNode): val is SectionNode =>
    !!val && val.type === "SECTION"

  const [findSection] = findDSPage()
    .findChildren(
      (node) => node.type === "SECTION" && node.name === sectionName
    )
    .filter(isSection)

  return findSection
}

export const findFrame = (frameName: string) => {
  const isFrame = (val?: SceneNode): val is FrameNode =>
    !!val && val.type === "FRAME"

  const [findFrame] = findDSPage()
    .findChildren((node) => node.type === "FRAME" && node.name === frameName)
    .filter(isFrame)

  return findFrame
}

export const findText = (frameName: string) => {
  const isText = (val?: SceneNode): val is TextNode => !!val

  const findText = findFrame(frameName)
    .findAll((node) => node.type === "TEXT")
    .filter(isText)
    .sort((a, b) => a.name.localeCompare(b.name))

  return findText
}

export const findRectangle = (frameName: string) => {
  const isRectangle = (val?: SceneNode): val is RectangleNode => !!val

  const findRectangle = findFrame(frameName)
    .findAll((node) => node.type === "RECTANGLE")
    .filter(isRectangle)
    .sort((a, b) => a.name.localeCompare(b.name))

  return findRectangle
}

export const findElements = (frameName: string, type: string) => {
  const isText = (val?: SceneNode): val is TextNode => !!val
  const isRectangle = (val?: SceneNode): val is RectangleNode => !!val

  const findElement = findFrame(frameName)
    .findAll((node) => node.type === type.toUpperCase())
    .filter(type === "text" ? isText : isRectangle)
    .sort((a, b) => a.name.localeCompare(b.name))

  return findElement
}

// replace dashes with periods from a string
// replace slashes with periods from a string
export const replaceSlashesAndDashes = (str: string) => {
  return str.toLowerCase().replace(/[-/]/g, ".")
}

// replace dashes with periods from a string
// replace / with periods from a string
// replace spaces with period from a string
export const replaceSlashesDashesAndSpaces = (str: string) => {
  return str.toLowerCase().replace(/[-/ ]/g, ".")
}

// replace dashes with / from a string
export const replaceDashesWithSlashes = (str: string) => {
  return str.toLowerCase().replace(/-/g, "/")
}

// replace / with periods from a string
// replace spaces with dashes from a string
export const replaceSlashesAndSpacesWithDashes = (str: string) => {
  return str.toLowerCase().replace(/[ /]/g, "-")
}

// replace slashes with periods from a string
// replace spaces with dashes from a string
export const replaceSlashesWithPeriods = (str: string) => {
  return str.toLowerCase().replace(/\//g, ".")
}

// replace periods with dashes from a string
export const replacePeriods = (str: string) => {
  return str.toLowerCase().replace(/\./g, "-")
}

// replace spaces with dashes from a string
export const replaceSpaces = (str: string) => {
  return str.toLowerCase().replace(/\s/g, "-")
}

/**
 * TODO: allow dashes if a slash is present
 */
