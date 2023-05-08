import React from "react";
import RegisterForm from "./RegisterForm";

export default function Login({ onLogin }) {
  function handleFormSubmit(e, values) {
    e.preventDefault();
    onLogin(values);
  }

  return (
    <div className="register">
      <RegisterForm
        title="Вход"
        formName="login"
        btnText="Войти"
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
