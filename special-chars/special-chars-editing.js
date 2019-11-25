import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import SpecialCharsCommand from "./special-chars-command";

export default class SpecialCharsEditing extends Plugin {
  static get pluginName() {
    return "SpecialCharsEditing";
  }

  init() {
    const editor = this.editor;

    editor.commands.add("specialChars", new SpecialCharsCommand(editor));
  }
}
