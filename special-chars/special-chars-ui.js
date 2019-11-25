import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

export default class SpecialCharsUI extends Plugin {
  static get pluginName() {
    return "SpecialCharsUI";
  }
  init() {
    this._addButtons();
  }

  _addButtons() {
    const editor = this.editor;
    const t = editor.t;
    const componentFactory = editor.ui.componentFactory;

    const command = editor.commands.get("specialChars");

    "ўγhwl'\"".split('').forEach((e,i) => {
      componentFactory.add("specialChar"+(i+1), locale => {
        const buttonView = new ButtonView(locale);

        buttonView.set({
          label: t("special char "+(i+1)),
          withText: false,
          icon:
            '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="5" y="20" style="font-size:21px;">'+e+'</text></svg>',
          tooltip: true
        });

        this.listenTo(buttonView, "execute", () =>
          editor.execute("specialChars",{symbol: e})
        );

        return buttonView;
      });
    });
  }
}
