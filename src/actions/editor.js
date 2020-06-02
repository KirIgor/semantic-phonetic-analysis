export const SET_DATA = "SET_DATA";
export const ADD_THEME = "ADD_THEME";
export const ADD_THEMES = "ADD_THEMES";
export const DELETE_THEMES = "DELETE_THEMES";
export const CHANGE_THEME_MODEL = "CHANGE_THEME_MODEL";
export const SET_THEMES_COLORS = "SET_THEMES_COLORS";
export const CLEAR_THEMES = "CLEAR_THEMES";

export const setData = (data) => ({ type: SET_DATA, payload: data });

export const addTheme = (model) => ({
  type: ADD_THEME,
  payload: { model },
});

export const addThemes = (models) => ({
  type: ADD_THEMES,
  payload: { models },
});

export const deleteThemes = (themes) => ({
  type: DELETE_THEMES,
  payload: { themes },
});

export const changeThemeModel = (oldModel, newModel) => ({
  type: CHANGE_THEME_MODEL,
  payload: { oldModel, newModel },
});

export const setThemesColors = (map) => ({
  type: SET_THEMES_COLORS,
  payload: { map },
});

export const clearThemes = () => ({ type: CLEAR_THEMES });
