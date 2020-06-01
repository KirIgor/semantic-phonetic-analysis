/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module highlight/highlightcommand
 */

import Command from "@ckeditor/ckeditor5-core/src/command";

/**
 * The highlight command. It is used by the {@link module:highlight/highlightediting~HighlightEditing highlight feature}
 * to apply the text highlighting.
 *
 *		editor.execute( 'highlight', { value: 'greenMarker' } );
 *
 * **Note**: Executing the command without a value removes the attribute from the model. If the selection is collapsed
 * inside a text with the highlight attribute, the command will remove the attribute from the entire range
 * of that text.
 *
 * @extends module:core/command~Command
 */
export default class HighlightCommand extends Command {
  /**
   * @inheritDoc
   */
  //   refresh() {
  //     const model = this.editor.model;
  //     const doc = model.document;

  //     /**
  //      * A value indicating whether the command is active. If the selection has some highlight attribute,
  //      * it corresponds to the value of that attribute.
  //      *
  //      * @observable
  //      * @readonly
  //      * @member {undefined|String} module:highlight/highlightcommand~HighlightCommand#value
  //      */
  //     this.value = doc.selection.getAttribute("highlight");
  //     this.isEnabled = model.schema.checkAttributeInSelection(
  //       doc.selection,
  //       "highlight"
  //     );
  //   }

  /**
   * Executes the command.
   *
   * @protected
   * @param {Object} [options] Options for the executed command.
   * @param {String} [options.value] The value to apply.
   *
   * @fires execute
   */
  execute(options = {}) {
    const model = this.editor.model;
    const document = model.document;
    const selection = document.selection;

    const highlighter = options.value;

    model.change((writer) => {
      if (!highlighter) {
        for (const range of selection.getRanges()) {
          options.list.forEach((attr) => {
            writer.removeAttribute(attr, range);
            writer.removeSelectionAttribute(attr);
          });
        }
      } else {
        const ranges = model.schema.getValidRanges(
          selection.getRanges(),
          highlighter
        );

        if (selection.isCollapsed) {
          const position = selection.getFirstPosition();

          // When selection is inside text with `highlight` attribute.
          if (selection.hasAttribute(highlighter)) {
            // Find the full highlighted range.
            const isSameHighlight = (value) => {
              return value.item.hasAttribute(highlighter);
            };

            const highlightStart = position.getLastMatchingPosition(
              isSameHighlight,
              { direction: "backward" }
            );
            const highlightEnd = position.getLastMatchingPosition(
              isSameHighlight
            );

            const highlightRange = writer.createRange(
              highlightStart,
              highlightEnd
            );

            writer.setAttribute(highlighter, true, highlightRange);
            writer.setSelectionAttribute(highlighter, true);
          } else {
            writer.setSelectionAttribute(highlighter, true);
          }
        } else {
          for (const range of ranges) {
            writer.setAttribute(highlighter, true, range);
          }
        }
      }
    });
  }
}
