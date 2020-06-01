import React from "react";
import { connect } from "react-redux";

import Input from "@material-ui/core/Input";
import UIList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { List } from "immutable";

import "./themes.css";

const Themes = React.memo(({ themes }) => {
  const [selectedThemes, setSelectedThemes] = React.useState(List());
  const [themesFilter, setThemesFilter] = React.useState("");

  const addThemeToSelectedText = React.useCallback(
    (theme) => () => {
      window.editor.execute("highlight", {
        value: theme.model,
        list: themes.map((t) => t.model),
      });
    },
    []
  );

  const selectTheme = React.useCallback(
    (theme) => () => {
      if (selectedThemes.contains(theme)) {
        setSelectedThemes(selectedThemes.remove(selectedThemes.indexOf(theme)));
      } else {
        setSelectedThemes(selectedThemes.concat(theme));
      }
    },
    [selectedThemes]
  );

  const changeThemesFilter = React.useCallback((e) => {
    setThemesFilter(e.target.value);
  }, []);

  return (
    <div className="themes-root">
      <Input
        defaultValue=""
        value={themesFilter}
        onChange={changeThemesFilter}
        inputProps={{ "aria-label": "seacrh for theme" }}
      />
      <UIList aria-label="themes">
        {themes
          .filter((theme) =>
            theme.model.toLowerCase().includes(themesFilter.toLowerCase())
          )
          .map((theme) => (
            <ListItem
              button
              selected={selectedThemes.contains(theme)}
              onClick={addThemeToSelectedText(theme)}
              onDoubleClick={selectTheme(theme)}
            >
              <ListItemText primary={theme.model} />
            </ListItem>
          ))}
      </UIList>
    </div>
  );
});

const mapStateToPros = ({ editor }) => ({
  themes: editor.config.highlight.options,
});

export default connect(mapStateToPros)(Themes);
