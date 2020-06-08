import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";

export default class HighlightUI extends Plugin {
  static get pluginName() {
    return "HighlightUI";
  }

  init() {
    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add("highlight", (locale) => {
      const view = new ButtonView(locale);

      view.set({
        label: t("Включить/Выключить скобки"),
        withText: false,
        icon:
          '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><text x="5" y="20"><tspan style="font-size:21px;">[]</tspan></text></svg>',
        tooltip: true,
      });

      this.listenTo(view, "execute", () => {
        const sheet = [...document.styleSheets].find((sheet) =>
          [...sheet.cssRules].find(
            (r) => r.selectorText == ".highlight::before"
          )
        );
        const rules = [...sheet.cssRules];

        const ruleBefore = rules.find(
          (r) => r.selectorText == `.highlight::before`
        );
        const ruleAfter = rules.find(
          (r) => r.selectorText == `.highlight::after`
        );

        if (ruleBefore.style["content"] == '"["') {
          ruleBefore.style.setProperty("content", "");
          ruleAfter.style.setProperty("content", "");
        } else {
          ruleBefore.style.setProperty("content", '"["');
          ruleAfter.style.setProperty("content", '"]"');
        }
      });

      return view;
    });
  }
}
