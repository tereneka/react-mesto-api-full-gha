import React from "react";
import { useForm } from "../hooks/useForm";

export default function RegisterForm({
  title,
  formName,
  btnText,
  onSubmit,
}) {
  const {
    values,
    errMessages,
    isTouched,
    handleChange,
  } = useForm(["email", "password"]);

  const isFormValid =
    !Object.values(errMessages).some(
      (i) => !!i
    ) &&
    !Object.values(isTouched).some((i) => !i);

  return (
    <>
      <h1 className="register__title">{title}</h1>

      <form
        className="register__form"
        name={formName}
        onSubmit={(e) => onSubmit(e, values)}
        noValidate>
        <input
          className="input register__input"
          value={values.email}
          onChange={handleChange}
          name="email"
          placeholder="Email"
          type="email"
          required
        />
        <span className="input-error">
          {errMessages.email}
        </span>

        <input
          className="input register__input"
          value={values.password}
          onChange={handleChange}
          name="password"
          placeholder="Пароль"
          type="password"
          required
          minLength={8}
        />
        <span className="input-error">
          {errMessages.password}
        </span>

        <button
          className={`submit-btn register__submit-btn ${
            isFormValid
              ? ""
              : "register__submit-btn_disabled"
          }`}
          type="submit"
          disabled={!isFormValid}>
          {btnText}
        </button>
      </form>
    </>
  );
}
