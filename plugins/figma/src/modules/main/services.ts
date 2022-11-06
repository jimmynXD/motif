export const createRectangle = (count: number) => {
  const nodes = [];

  for (let i = 0; i < count; i++) {
    const rect = figma.createRectangle();
    rect.x = i * 150;
    rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
    figma.currentPage.appendChild(rect);
    nodes.push(rect);
  }

  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);

  console.log(`created ${nodes.length} rectangles`);
};

export const log = (msg: string) => {
  console.log("Hello from motifXD", msg);
};

export const close = () => {
  console.log("close plugin plz");
  figma.closePlugin();
};

export const test = {
  log: (msg: string) => {
    console.log(msg);
  },
};
