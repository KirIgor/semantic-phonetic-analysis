import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

export default class MySuperscriptUI extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add("my_superscript", locale => {
      const command = editor.commands.get("superscript");
      const view = new ButtonView(locale);

      view.set({
        label: t("Ударение"),
        withText: false,
        icon:
          '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="5" y="20"><tspan style="font-size:21px;">a<tspan baseline-shift = "super">s</tspan></tspan></text></svg>',
        tooltip: true
      });

      view.bind("isOn", "isEnabled").to(command, "value", "isEnabled");
      this.listenTo(view, "execute", () => editor.execute("superscript"));

      return view;
    });
  }
}
