import React from "react";
import Popover from "@material-ui/core/Popover";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

import { List } from "immutable";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Highlight = React.memo(({ eventData }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [themes, setThemes] = React.useState([]);

  const target = eventData.target; // This is the view the user clicked on
  const span = editor.editing.view.domConverter.mapViewToDom(target);

  const onClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const onDelete = React.useCallback(
    (theme) => {
      const themesList = List(themes);
      const newThemes = themesList.delete(themesList.indexOf(theme)).toArray();

      setThemes(newThemes);

      if (newThemes.length == 0) setOpen(false);

      const viewRange = window.editor.editing.view.createRangeOn(target);
      const modelRange = window.editor.editing.mapper.toModelRange(viewRange);

      window.editor.model.change((writer) => {
        writer.removeAttribute(theme, modelRange);
      });
    },
    [themes, eventData, target]
  );

  React.useEffect(() => {
    if (span.classList.contains("highlight")) {
      setOpen(true);
    }
  }, [eventData]);

  React.useEffect(() => {
    if (open) {
      const viewRange = window.editor.editing.view.createRangeOn(target);

      window.editor.editing.view.change((writer) => {
        writer.setSelection(writer.createSelection(viewRange));
      });
    }
  }, [eventData, target, open]);

  React.useEffect(() => {
    if (open) {
      let themes = [];
      let current = span;

      while (current.localName == "span") {
        const tooltip = current.attributes["tooltip"];

        if (!tooltip) break;

        themes.push(current.attributes["tooltip"].value);
        current = current.parentNode;
      }

      setThemes(themes);
    }
  }, [eventData, span, open]);

  return (
    <Popover
      open={open}
      anchorEl={span}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Paper component="ul" className={classes.root}>
        {themes.map((theme) => {
          return (
            <li key={theme}>
              <Chip
                label={theme}
                onDelete={() => onDelete(theme)}
                className={classes.chip}
              />
            </li>
          );
        })}
      </Paper>
    </Popover>
  );
});

export default Highlight;
