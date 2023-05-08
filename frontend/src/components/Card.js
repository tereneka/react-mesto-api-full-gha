import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(
    CurrentUserContext
  );

  const isOwn =
    card.owner._id === currentUser._id;
  const isLiked = card.likes.some(
    (i) => i._id === currentUser._id
  );

  const likeBtnClassName = `elements__like ${
    isLiked ? "elements__like_active" : ""
  }`;

  function handleCardClick(e) {
    if (
      !e.target.classList.contains(
        "elements__like"
      ) &&
      !e.target.classList.contains(
        "elements__trash"
      )
    ) {
      onCardClick(card);
    }
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <div
      className="elements__item"
      onClick={handleCardClick}>
      <img
        className="elements__photo"
        src={card.link}
        alt={card.name}
      />
      {isOwn && (
        <button
          className="elements__trash"
          type="button"
          aria-label="удалить"
          onClick={handleCardDelete}></button>
      )}

      <div className="elements__title-flex-box">
        <h3 className="elements__title">
          {card.name}
        </h3>
        <div>
          <button
            className={likeBtnClassName}
            type="button"
            aria-label="нравится"
            onClick={handleLikeClick}></button>
          <p className="elements__like-count">
            {card.likes.length}
          </p>
        </div>
      </div>
    </div>
  );
}
