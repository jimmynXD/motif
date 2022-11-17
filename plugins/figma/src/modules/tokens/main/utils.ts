// convert rgb to hex
export const rgbToHex = (r: number, g: number, b: number) => {
  const bin = (r << 16) | (g << 8) | b
  return (function (h) {
    return new Array(7 - h.length).join("0") + h
  })(bin.toString(16).toUpperCase())
}

// create rgb values
export const rgbValue = (value: number) => Math.round(value * 255)

// access a specific section in a page
export const accessSection = (sectionName: string) => {
  const isSection = (val?: SceneNode): val is SectionNode =>
    !!val && val.type === "SECTION"

  const [findSection] = figma.currentPage
    .findChildren(
      (node) => node.type === "SECTION" && node.name === sectionName
    )
    .filter(isSection)

  return findSection
}

//   // find all frames inside the section
//   const isFrame = (val?: SceneNode): val is FrameNode => !!val
//   const findFrames = findSection
//     .findChildren((node) => node.type === "FRAME")
//     .filter(isFrame)

//   findFrames.forEach((frame) => {
//     // find all rectangles inside the frame
//     const findRect = frame
//       .findChildren((node) => node.type === "RECTANGLE")
//       .filter(isRectangle)
// // Now do something with the rectangles
//   })
