import React, { useEffect, useRef } from "react";

export default function PopupWithForm({
  title,
  name,
  children,
  isLoading,
  onClose,
  onSubmit,
  isFormValid,
}) {
  const popupRef = useRef();

  function closePopup(e) {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains(
        "popup__close-btn"
      )
    ) {
      popupRef.current.classList.add(
        "popup_closed"
      );
      setTimeout(() => {
        onClose();
      }, 300);
    }
  }

  function closePopupByEsc(e) {
    if (e.key === "Escape") {
      popupRef.current.classList.add(
        "popup_closed"
      );
      setTimeout(() => {
        onClose();
      }, 300);
    }
  }

  useEffect(() => {
    document.addEventListener(
      "keydown",
      closePopupByEsc
    );

    return () => {
      document.removeEventListener(
        "keydown",
        closePopupByEsc
      );
    };
  }, []);

  return (
    <div
      className={`popup popup_name_${name}`}
      ref={popupRef}
      onClick={closePopup}>
      <div className="popup__container popup__container_whith-info popup__container_for_form">
        <button
          className="popup__close-btn"
          type="button"
          aria-label="закрытие окна"></button>
        <h3 className="popup__title">{title}</h3>
        <div className="popup__content-box">
          <form
            className="popup__form"
            onSubmit={onSubmit}
            method="post"
            name={name}
            noValidate>
            {children}
            <button
              className={`submit-btn popup__submit-btn ${
                isFormValid
                  ? ""
                  : "popup__submit-btn_disabled"
              }`}
              type="submit"
              disabled={!isFormValid}>
              {isLoading
                ? "Сохранение..."
                : "Сохранить"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
