import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview";
import Plugin from "@ckeditor/ckeditor5-core/src/plugin";

export default class InterviewItemUI extends Plugin {
  init() {
    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add("interviewItem", locale => {
      const command = editor.commands.get("insertInterviewItem");
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t("Вопрос — Ответ"),
        withText: true,
        tooltip: true
      });

      buttonView.bind("isOn", "isEnabled").to(command, "value", "isEnabled");

      this.listenTo(buttonView, "execute", () =>
        editor.execute("insertInterviewItem")
      );

      return buttonView;
    });
  }
}
