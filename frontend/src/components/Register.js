import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

export default function Register({ onRegister }) {
  function handleFormSubmit(e, values) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <div className="register">
      <RegisterForm
        title="Регистрация"
        formName="register"
        btnText="Зарегистрироваться"
        onSubmit={handleFormSubmit}
      />

      <Link
        className="register__link"
        to="/sign-in">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}
