import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import AccentCommand from "./accentcommand";

export default class AccentEditing extends Plugin {
  static get pluginName() {
    return "AccentEditing";
  }

  init() {
    const editor = this.editor;

    editor.commands.add("accent", new AccentCommand(editor));
  }
}
