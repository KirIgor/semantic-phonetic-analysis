import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

export default class AccentUI extends Plugin {
  static get pluginName() {
    return "AccentUI";
  }
  init() {
    this._addButton();
  }

  _addButton() {
    const editor = this.editor;
    const t = editor.t;
    const componentFactory = editor.ui.componentFactory;

    componentFactory.add("accent", locale => {
      const command = editor.commands.get("accent");
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t("accent"),
        withText: false,
        icon:
          '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="5" y="20" style="font-size:21px;">а́</text></svg>',
        tooltip: true
      });

      this.listenTo(buttonView, "execute", () =>
        editor.execute("accent")
      );

      return buttonView;
    });
  }
}
