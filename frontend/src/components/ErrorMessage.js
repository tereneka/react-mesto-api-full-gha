import React from "react";

export default function ErrorMessage({
  message,
}) {
  return (
    <p className="error">
      {message ? ` Ошибка: ${message}` : ""}
    </p>
  );
}
