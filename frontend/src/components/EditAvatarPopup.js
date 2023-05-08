import React, { useEffect, useRef } from "react";
import { useForm } from "../hooks/useForm";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  isLoading,
  onClose,
  onUpdateAvatar,
}) {
  const { errMessages, isTouched, handleChange } =
    useForm(["avatar"]);

  const avatarRef = useRef();

  const isFormValid =
    !Object.values(errMessages).some(
      (i) => !!i
    ) &&
    !Object.values(isTouched).some((i) => !i);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}>
      <input
        className="input popup__input popup__input_data_avatar"
        ref={avatarRef}
        id="avatar-input"
        type="url"
        name="avatar"
        required
        placeholder="Ссылка на картинку"
        onChange={handleChange}
      />
      <span className="input-error">
        {errMessages.avatar}
      </span>
    </PopupWithForm>
  );
}
