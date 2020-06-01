export const SET_DATA = "SET_DATA";
export const ADD_THEME = "ADD_THEME";
export const DELETE_THEME = "DELETE_THEME";
export const CHANGE_THEME_MODEL = "CHANGE_THEME_MODEL";

export const setData = (data) => ({ type: SET_DATA, payload: data });
export const addTheme = () => ({
  type: ADD_THEME,
  payload: { model: "", color: { r: 0, g: 0, b: 0, a: 0.5 } },
});
export const deleteTheme = (model) => ({
  type: DELETE_THEME,
  payload: { model },
});
export const changeThemeModel = (oldModel, newModel) => ({
  type: CHANGE_THEME_MODEL,
  payload: { oldModel, newModel },
});
