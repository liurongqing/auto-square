async function createRasterizedSquare(
  originalNode: SceneNode,
): Promise<SceneNode | null> {
  const maxSize = Math.max(originalNode.width, originalNode.height);
  const frame = figma.createFrame();

  frame.resize(maxSize, maxSize);
  frame.x = originalNode.x;
  frame.y = originalNode.y;
  frame.fills = [];
  frame.name = originalNode.name;

  if (originalNode.parent) {
    originalNode.parent.appendChild(frame);
  }

  frame.appendChild(originalNode);
  originalNode.x = (maxSize - originalNode.width) / 2;
  originalNode.y = (maxSize - originalNode.height) / 2;

  try {
    const pngBytes = await frame.exportAsync({ format: "PNG" });
    const image = figma.createImage(pngBytes);

    const flatRect = figma.createRectangle();
    flatRect.resize(maxSize, maxSize);
    flatRect.x = frame.x;
    flatRect.y = frame.y;
    flatRect.name = frame.name;
    flatRect.fills = [
      { type: "IMAGE", imageHash: image.hash, scaleMode: "FILL" },
    ];

    if (frame.parent) {
      frame.parent.appendChild(flatRect);
    }

    frame.remove();
    return flatRect;
  } catch (_error) {
    frame.remove();
    return null;
  }
}

const selection = figma.currentPage.selection;

if (selection.length === 0) {
  figma.notify("Please select at least one layer first!", { error: true });
  figma.closePlugin();
} else {
  if (figma.command === "frame") {
    let count = 0;
    selection.forEach((node) => {
      if (Math.round(node.width) === Math.round(node.height)) return;
      const maxSize = Math.max(node.width, node.height);
      const frame = figma.createFrame();

      frame.resize(maxSize, maxSize);
      frame.x = node.x;
      frame.y = node.y;
      frame.fills = [];
      frame.name = node.name;

      if (node.parent) {
        node.parent.appendChild(frame);
      }

      frame.appendChild(node);
      node.x = (maxSize - node.width) / 2;
      node.y = (maxSize - node.height) / 2;
      count++;
    });

    figma.notify(`Done! ${count} layers framed. ✨`);
    figma.closePlugin();
  } else if (figma.command === "rasterize") {
    (async () => {
      let count = 0;
      const rasterizedNodes: SceneNode[] = [];

      for (const node of selection) {
        if (Math.round(node.width) === Math.round(node.height)) {
          rasterizedNodes.push(node);
          continue; 
        }
        const resultNode = await createRasterizedSquare(node);
        if (resultNode) {
          rasterizedNodes.push(resultNode);
          count++;
        }
      }

      figma.currentPage.selection = rasterizedNodes;
      figma.notify(`Done! ${count} layers rasterized. 🖼️`);
      figma.closePlugin();
    })();
  } else {
    figma.closePlugin();
  }
}
