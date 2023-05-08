import { useState } from "react";

export function useForm(inputNames) {
  const [values, setValues] = useState(
    getInputsObject("")
  );
  const [errMessages, setErrMessages] = useState(
    getInputsObject("")
  );

  const [isTouched, setIsTouched] = useState(
    getInputsObject(false)
  );

  function getInputsObject(value) {
    const res = {};

    inputNames.forEach((name) => {
      res[name] = value;
    });

    return res;
  }

  const handleChange = (e) => {
    const { value, name, validationMessage } =
      e.target;
    setValues({ ...values, [name]: value });
    setErrMessages({
      ...errMessages,
      [name]: validationMessage,
    });
    setIsTouched({ ...isTouched, [name]: true });
  };

  return {
    values,
    setValues,
    errMessages,
    isTouched,
    handleChange,
  };
}
