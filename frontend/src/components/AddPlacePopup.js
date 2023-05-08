import React, { useEffect } from "react";
import { useForm } from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  isLoading,
  onClose,
  onAddPlace,
}) {
  const {
    values,
    setValues,
    errMessages,
    isTouched,
    handleChange,
  } = useForm(["name", "link"]);

  const isFormValid =
    !Object.values(errMessages).some(
      (i) => !!i
    ) &&
    !Object.values(isTouched).some((i) => !i);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", link: "" });
    }
  }, []);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}>
      <input
        className="input popup__input popup__input_data_card-name"
        value={values.name}
        onChange={handleChange}
        id="card-name-input"
        placeholder="Название"
        type="text"
        name="name"
        autoFocus
        required
        minLength="2"
        maxLength="30"
      />
      <span className="input-error">
        {errMessages.name}
      </span>
      <input
        className="input popup__input popup__input_data_card-link"
        value={values.link}
        onChange={handleChange}
        id="card-link-input"
        placeholder="Ссылка на картинку"
        type="url"
        name="link"
        required
      />
      <span className="input-error">
        {errMessages.link}
      </span>
    </PopupWithForm>
  );
}
