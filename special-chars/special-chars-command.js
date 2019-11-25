import Command from "@ckeditor/ckeditor5-core/src/command";
import splitByAttributes from "../utils";

export default class SpecialCharsCommand extends Command {
  execute({ symbol }) {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;

    model.change(writer => {
      const ranges = selection.getRanges();

      for (const range of ranges) {
        const attributeRanges = splitByAttributes(writer, range);
        const lastAttributeRange = attributeRanges.slice(-1)[0];
        const lastNode =
          lastAttributeRange.start.textNode ||
          lastAttributeRange.start.nodeAfter ||
          lastAttributeRange.start.nodeBefore;

        writer.remove(range);
        writer.insertText(
          symbol,
          lastNode ? lastNode.getAttributes() : [],
          range.start.parent,
          range.start.offset
        );
      }
    });
  }
}
