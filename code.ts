const selection = figma.currentPage.selection;

if (selection.length === 0) {
  figma.notify("Please select at least one image/layer first!", {
    error: true,
  });
  figma.closePlugin();
} else {
  let processedCount = 0;

  selection.forEach((node) => {
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

    processedCount++;
  });

  figma.notify(`Done! ${processedCount} layers are now perfect squares. ✨`);
  figma.closePlugin();
}
