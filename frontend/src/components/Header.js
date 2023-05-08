import React from "react";
import {
  Link as button,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import logo from "../images/logo-white.svg";

export default function Header({ userEmail }) {
  function signOut() {
    localStorage.removeItem("jwt");
  }

  return (
    <header className="header">
      <a href="#">
        <img
          className="logo"
          src={logo}
          alt="Место"
        />
      </a>

      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link
              className="header__link"
              to={"/sign-in"}>
              Войти
            </Link>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Link
              className="header__link"
              to={"/sign-up"}>
              Регистрация
            </Link>
          }
        />

        <Route
          path="/"
          element={
            <div className="header__container">
              <p className="header__email">
                {userEmail}
              </p>
              <Link
                className="header__link header__link_page_main"
                to={"/sign-up"}
                onClick={signOut}>
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}
