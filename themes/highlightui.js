import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

import Template from "@ckeditor/ckeditor5-ui/src/template";

import Collection from "@ckeditor/ckeditor5-utils/src/collection";
import Model from "@ckeditor/ckeditor5-ui/src/model";

import {
  createDropdown,
  addListToDropdown
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";

export default class HighlightUI extends Plugin {
  static get pluginName() {
    return "HighlightUI";
  }
  init() {
    const options = this.editor.config.get("highlight.options");

    this._addDropdown(options);
  }

  _addDropdown(options) {
    const editor = this.editor;
    const t = editor.t;
    const componentFactory = editor.ui.componentFactory;

    const startingHighlighter = options[0];

    const optionsMap = options.reduce((retVal, option) => {
      retVal[option.model] = option;

      return retVal;
    }, {});

    componentFactory.add("highlight", locale => {
      const dropdownView = createDropdown(locale);

      // Populate the list in the dropdown with items.
      addListToDropdown(
        dropdownView,
        this._getDropdownItemsDefinitions(options)
      );

      dropdownView.buttonView.set({
        // The t() function helps localize the editor. All strings enclosed in t() can be
        // translated and change when the language of the editor changes.
        label: t("Тема"),
        tooltip: true,
        icon:
          '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><circle cx="7.2" cy="14.4" r="3.2"/><circle cx="14.8" cy="18" r="2"/><circle cx="15.2" cy="8.8" r="4.8"/></svg>',
        withText: true
      });

      // Execute the command when the dropdown item is clicked (executed).
      this.listenTo(dropdownView, "execute", evt => {
        editor.execute("highlight", { value: evt.source.commandParam });
        editor.editing.view.focus();
      });

      return dropdownView;
    });
  }

  _getDropdownItemsDefinitions(options) {
    const itemDefinitions = new Collection();

    for (const option of options) {
      const definition = {
        type: "button",
        model: new Model({
          commandParam: option.model,
          label: option.model,
          icon:
            '<?xml version="1.0"?><svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle fill="' +
            option.color +
            '" cx="50" cy="50" r="50"/></svg>',
          withText: true
        })
      };

      // Add the item definition to the collection.
      itemDefinitions.add(definition);
    }

    return itemDefinitions;
  }
}
