import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { useAlert } from "react-alert";

import FlipMove from "react-flip-move";

// import Modal from "react-responsive-modal";
import Modal from "react-modal";

import {
  changeThemeModel,
  addTheme,
  deleteTheme,
} from "../../../actions/editor";

import "./edit-themes-modal.css";

const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const addIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
  </svg>
);

const EditThemesModal = React.memo(
  ({ open, onClose, themes, changeThemeModel, deleteTheme, addTheme }) => {
    const [editModel, setEditModel] = React.useState(null);
    const [editModelData, setEditModelData] = React.useState(null);

    const alert = useAlert();

    React.useEffect(() => {
      const input = document.getElementById(editModel + "-input");
      if (input) input.focus();
    }, [editModel]);

    const onCrossClick = React.useCallback((model) => {
      deleteTheme(model);
    }, []);

    const onThemeAdd = React.useCallback(() => {
      try {
        addTheme();
        setEditModel("");
      } catch (e) {
        alert.error(e.message);
      }
    }, []);

    const onDoubleClickModel = React.useCallback((model) => {
      setEditModel(model);
      setEditModelData(model);
    }, []);

    const onInputBlur = React.useCallback(() => {
      try {
        if (editModel !== editModelData && editModelData) {
          changeThemeModel(editModel, editModelData);
        }
      } catch (e) {
        alert.error(e.message);
      }

      setEditModel(null);
      setEditModelData(null);
    }, [editModel, editModelData]);

    const onChangeInput = React.useCallback((e) => {
      setEditModelData(e.target.value);
    }, []);

    const onInputKeyDown = React.useCallback(
      (e) => {
        if (e.key == "Enter") {
          onInputBlur();
        }
      },
      [editModel, editModelData]
    );

    return (
      <Modal
        isOpen={open}
        onRequestClose={onClose}
        style={{
          overlay: {
            zIndex: 1500,
            backgroundColor: "white",
          },
        }}
      >
        <div>
          <div className="edit-themes-modal">
            <FlipMove>
              {themes.map((theme) => (
                <div key={theme.model} className="edit-themes-modal-theme">
                  <div className="edit-themes-modal-theme-info">
                    <div
                      className="edit-themes-modal-model"
                      onDoubleClick={() => onDoubleClickModel(theme.model)}
                    >
                      {editModel == theme.model ? (
                        <input
                          id={theme.model + "-input"}
                          type="text"
                          value={editModelData}
                          onChange={onChangeInput}
                          onKeyDown={onInputKeyDown}
                          onBlur={onInputBlur}
                        />
                      ) : (
                        theme.model
                      )}
                    </div>
                  </div>
                  <div
                    className="edit-themes-modal-close"
                    onClick={() => onCrossClick(theme.model)}
                  >
                    {closeIcon}
                  </div>
                </div>
              ))}
            </FlipMove>
          </div>
          <div className="edit-themes-modal-add" onClick={onThemeAdd}>
            {addIcon}
          </div>
        </div>
      </Modal>
    );
  }
);

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addTheme, deleteTheme, changeThemeModel }, dispatch);

export default connect(null, mapDispatchToProps)(EditThemesModal);
