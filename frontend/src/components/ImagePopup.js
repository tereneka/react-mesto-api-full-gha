import React, { useEffect, useRef } from "react";

export default function ImagePopup({
  card,
  onClose,
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
      className="popup popup_name_fullscreen-photo"
      ref={popupRef}
      onClick={closePopup}>
      <div className="popup__container">
        <button
          className="popup__close-btn"
          type="button"
          aria-label="закрытие добавления нового места"></button>
        <img
          className="popup__photo"
          src={card?.link}
          alt={card?.name}
        />
        <p className="popup__photo-caption">
          {card?.name}
        </p>
      </div>
    </div>
  );
}
