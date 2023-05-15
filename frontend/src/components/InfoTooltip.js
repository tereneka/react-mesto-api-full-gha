import React, { useEffect, useRef } from "react";
import successImg from "../images/success.svg";
import errorImg from "../images/error.svg";

export default function InfoTooltip({
  data,
  onClose,
}) {
  const popupRef = useRef();

  const isSuccess =
    data.state && data.state === "success";

  const imgSrc = `${
    isSuccess ? successImg : errorImg
  }`;

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
      className="popup popup_name_tooltip"
      ref={popupRef}
      onClick={closePopup}>
      <div className="popup__container  popup__container_whith-info popup__container_for_tooltip">
        <button
          className="popup__close-btn"
          type="button"
          aria-label="закрытие окна"></button>

        <img
          className="popup__icon"
          src={imgSrc}
          alt={data.state}
        />
        <p className="popup__paragraph">
          {data.message}
        </p>
      </div>
    </div>
  );
}
