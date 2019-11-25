import Command from "@ckeditor/ckeditor5-core/src/command";
import splitByAttributes from "../utils";

const accentSymbol = "\u0301";

export default class AccentCommand extends Command {
  execute(options = {}) {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;

    model.change(writer => {
      const ranges = selection.getRanges();

      const attributeRanges = Array.from(ranges)
        .reduce(
          (acc, range) => acc.concat(splitByAttributes(writer, range)),
          []
        )
        .flat();

      const toAdd = [];

      for (const range of attributeRanges) {
        const node = range.start.textNode || range.start.nodeAfter;
        const startOffset = node.startOffset;
        const text = node.data.slice(
          range.start.offset - startOffset,
          range.end.offset - startOffset
        );

        let resText = "";
        if (
          text.length % 2 == 0 &&
          text
            .split("")
            .every((a, i) => (i % 2 == 0 ? true : a == accentSymbol))
        ) {
          resText = text
            .split("")
            .map(a => (a == accentSymbol ? "" : a))
            .join("");
        } else {
          resText = text
            .split("")
            .map(a => (a == accentSymbol ? "" : a + accentSymbol))
            .join("");
        }

        toAdd.push({
          text: resText,
          attrs: node.getAttributes(),
          range: range
        });
      }

      let secondayOffset = 0;

      for (const { text, attrs, range } of toAdd) {
        writer.remove(
          writer.createRange(
            range.start.getShiftedBy(secondayOffset),
            range.end.getShiftedBy(secondayOffset)
          )
        );
        writer.insertText(
          text,
          attrs,
          range.start.parent,
          range.start.offset + secondayOffset
        );

        secondayOffset += range.end.offset - range.start.offset;
      }
    });
  }
}
