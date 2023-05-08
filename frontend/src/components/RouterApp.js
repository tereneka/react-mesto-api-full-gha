import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Main from "./Main";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";

export default function RouterApp({
  loggedIn,
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  onRegister,
  onLogin,
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute
            element={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditAvatar={onEditAvatar}
            onEditProfile={onEditProfile}
            onAddPlace={onAddPlace}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        }
      />

      <Route
        path="/sign-up"
        element={
          <Register onRegister={onRegister} />
        }
      />

      <Route
        path="/sign-in"
        element={<Login onLogin={onLogin} />}
      />
    </Routes>
  );
}
