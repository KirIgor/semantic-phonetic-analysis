import SpecialCharsEditing from "./special-chars-editing";
import SpecialCharsUI from "./special-chars-ui";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class SpecialChars extends Plugin {
  static get requires() {
    return [SpecialCharsEditing, SpecialCharsUI];
  }
}
