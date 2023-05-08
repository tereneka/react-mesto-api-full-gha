import React, {
  useContext,
  useEffect,
} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({
  isOpen,
  isLoading,
  onClose,
  onUpdateUser,
}) {
  const currentUser = useContext(
    CurrentUserContext
  );

  const {
    values,
    setValues,
    errMessages,
    isTouched,
    handleChange,
  } = useForm(["name", "about"]);

  const isFormValid =
    !Object.values(errMessages).some(
      (i) => !!i
    ) && Object.values(isTouched).some((i) => i);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }
  console.log(values);
  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}>
      <input
        className="input popup__input popup__input_data_user-name"
        value={values.name}
        onChange={handleChange}
        id="user-name-input"
        type="text"
        name="name"
        autoFocus
        required
        minLength="2"
        maxLength="40"
        placeholder="Имя"
      />
      <span className="input-error">
        {errMessages.name}
      </span>

      <input
        className="input popup__input popup__input_data_user-about"
        value={values.about}
        onChange={handleChange}
        id="user-about-input"
        type="text"
        name="about"
        required
        minLength="2"
        maxLength="200"
        placeholder="О себе"
      />
      <span className="input-error">
        {errMessages.about}
      </span>
    </PopupWithForm>
  );
}
