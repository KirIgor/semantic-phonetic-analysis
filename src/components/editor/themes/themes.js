import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import UIList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import FormatClearIcon from "@material-ui/icons/FormatClear";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import HighlightIcon from "@material-ui/icons/Highlight";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { lighten, makeStyles } from "@material-ui/core/styles";

import { List } from "immutable";

import {
  deleteThemes,
  addTheme,
  setThemesColors,
} from "../../../actions/editor";

import TreeWalker from "@ckeditor/ckeditor5-engine/src/model/treewalker";
import Position from "@ckeditor/ckeditor5-engine/src/model/position";

import "./themes.css";

const xmur3 = (str) => {
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
    (h = Math.imul(h ^ str.charCodeAt(i), 3432918353)),
      (h = (h << 13) | (h >>> 19));
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
};

const randomRgba = (seed) => {
  const rand = xmur3(seed);
  const r = () => rand() / 3266489909;

  const o = Math.round,
    s = 170;

  return (
    "rgba(" +
    o(30 + r() * s) +
    "," +
    o(30 + r() * s) +
    "," +
    o(30 + r() * s) +
    "," +
    (0.5 + r() * 0.2).toFixed(1) +
    ")"
  );
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const Themes = React.memo(
  ({ themes, deleteThemes, addTheme, setThemesColors }) => {
    const [selectedThemes, setSelectedThemes] = React.useState(List());
    const [highlightedThemes, setHighlightedThemes] = React.useState(List());
    const [themesFilter, setThemesFilter] = React.useState("");
    const [addThemeName, setAddThemeName] = React.useState("");

    const classes = useToolbarStyles();

    const clearFormattingOfSelectedText = React.useCallback(() => {
      window.editor.execute("highlight", {
        list: themes.map((t) => t.model),
      });
    }, []);

    const addThemeToSelectedText = React.useCallback(
      (theme) => () => {
        window.editor.execute("highlight", {
          value: theme.model,
          list: themes.map((t) => t.model),
        });
      },
      []
    );

    const toggleSelectTheme = React.useCallback(
      (theme) => () => {
        if (selectedThemes.contains(theme)) {
          setSelectedThemes(
            selectedThemes.remove(selectedThemes.indexOf(theme))
          );
        } else {
          setSelectedThemes(selectedThemes.concat(theme));
        }
      },
      [selectedThemes]
    );

    const changeThemesFilter = React.useCallback((e) => {
      setThemesFilter(e.target.value);
    }, []);

    const deleteThemesCallback = React.useCallback(() => {
      const model = window.editor.model;
      const startPosition = new Position(model.document.getRoot(), [0]);
      const treeWalker = new TreeWalker({ startPosition });

      model.change((writer) => {
        for (const treeItem of treeWalker) {
          selectedThemes.forEach((theme) =>
            writer.removeAttribute(theme.model, treeItem.item)
          );
        }
      });

      deleteThemes(selectedThemes.toArray());
      setSelectedThemes(List());
    }, [selectedThemes, deleteThemes]);

    const setAddThemeNameCallback = React.useCallback(
      (e) => {
        setAddThemeName(e.target.value);
      },
      [setAddThemeName]
    );

    const addThemeCallback = React.useCallback(
      (e) => {
        addTheme(addThemeName);
        setAddThemeName("");
      },
      [addTheme, addThemeName, setAddThemeName]
    );

    const toggleHighlightThemes = React.useCallback(() => {
      const highlighted = selectedThemes.filter((theme) =>
        highlightedThemes.contains(theme.model)
      );
      const notHighlighted = selectedThemes.filter(
        (theme) => !highlightedThemes.contains(theme.model)
      );

      setHighlightedThemes(
        highlightedThemes
          .filter(
            (model) => !highlighted.map((theme) => theme.model).contains(model)
          )
          .concat(notHighlighted.map((theme) => theme.model))
      );

      setSelectedThemes(List());

      const themesColors = notHighlighted.reduce((acc, cur) => {
        if (!cur.color) {
          acc[cur.model] = randomRgba(cur.model);
        }
        return acc;
      }, {});

      setThemesColors(themesColors);

      const sheet = [...document.styleSheets].find((sheet) =>
        [...sheet.cssRules].find((r) => r.selectorText == '[tooltip="быт"]')
      );
      const rules = [...sheet.cssRules];

      highlighted.forEach((theme) => {
        const rule = rules.find(
          (r) => r.selectorText == `[tooltip="${theme.model}"]`
        );

        if (rule) {
          rule.style.setProperty("background", "none");
        }
      });

      notHighlighted.forEach((theme) => {
        const rule = rules.find(
          (r) => r.selectorText == `[tooltip="${theme.model}"]`
        );

        if (rule) {
          rule.style.setProperty(
            "background",
            theme.color ? theme.color : themesColors[theme.model]
          );
        } else {
          sheet.insertRule(
            `[tooltip="${theme.model}"] { background: ${
              theme.color ? theme.color : themesColors[theme.model]
            } }`
          );
        }
      });
    }, [
      selectedThemes,
      highlightedThemes,
      setHighlightedThemes,
      setSelectedThemes,
      setThemesColors,
    ]);

    return (
      <div className="themes-root">
        <Toolbar className={classes.root}>
          {selectedThemes.size > 0 ? (
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              Выбрано {selectedThemes.size}
            </Typography>
          ) : (
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Темы
            </Typography>
          )}

          {selectedThemes.size > 0 && (
            <>
              <Tooltip
                title="Подсветить/Выключить"
                onClick={toggleHighlightThemes}
              >
                <IconButton aria-label="Подсветить/Выключить подсветку">
                  <HighlightIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Удалить">
                <IconButton aria-label="Удалить" onClick={deleteThemesCallback}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
        <TextField
          label="Искать"
          value={themesFilter}
          onChange={changeThemesFilter}
          inputProps={{ "aria-label": "Искать тему" }}
        />
        <UIList aria-label="themes" className="themes-list">
          {themes
            .filter((theme) =>
              theme.model.toLowerCase().includes(themesFilter.toLowerCase())
            )
            .map((theme) => (
              <ListItem
                button
                selected={selectedThemes.contains(theme)}
                onClick={addThemeToSelectedText(theme)}
              >
                {highlightedThemes.contains(theme.model) && (
                  <ListItemAvatar>
                    <Avatar style={{ background: theme.color }}>
                      <div />
                    </Avatar>
                  </ListItemAvatar>
                )}
                <ListItemText primary={theme.model} />
                <ListItemSecondaryAction>
                  {selectedThemes.contains(theme) ? (
                    <IconButton
                      edge="end"
                      aria-label="Снять выделение"
                      onClick={toggleSelectTheme(theme)}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      edge="end"
                      aria-label="Выделить"
                      onClick={toggleSelectTheme(theme)}
                    >
                      <CheckIcon />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </UIList>
        <ListItem button onClick={clearFormattingOfSelectedText}>
          <ListItemIcon>
            <FormatClearIcon />
          </ListItemIcon>
          <ListItemText primary="Очистить" />
        </ListItem>
        <div className="themes-add">
          <TextField
            label="Добавить"
            value={addThemeName}
            onChange={setAddThemeNameCallback}
            style={{ width: "100%" }}
          />
          <Button onClick={addThemeCallback}>Добавить</Button>
        </div>
      </div>
    );
  }
);

const mapStateToPros = ({ editor }) => ({
  themes: editor.config.highlight.options,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ deleteThemes, addTheme, setThemesColors }, dispatch);

export default connect(mapStateToPros, mapDispatchToProps)(Themes);
