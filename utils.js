const splitByAttributes = (writer, range) => {
  const startNode = range.start.textNode || range.start.nodeAfter;
  const endNode = range.end.textNode || range.end.nodeBefore;

  const startOffset = range.start.offset;
  const endOffset = range.end.offset;

  if (startOffset == endOffset) return [range];

  const res = [];
  let currentNode = startNode;

  while (currentNode != null && !currentNode.isAfter(endNode)) {
    const startOffset = Math.max(currentNode.startOffset, range.start.offset);
    const endOffset = Math.min(
      currentNode.startOffset + currentNode.data.length,
      range.end.offset
    );

    res.push(
      writer.createRange(
        writer
          .createPositionFromPath(currentNode.root, currentNode.getPath())
          .getShiftedBy(startOffset - currentNode.startOffset),
        writer
          .createPositionFromPath(currentNode.root, currentNode.getPath())
          .getShiftedBy(endOffset - currentNode.startOffset)
      )
    );

    currentNode = currentNode.nextSibling;
  }

  return res;
};

export default splitByAttributes;
