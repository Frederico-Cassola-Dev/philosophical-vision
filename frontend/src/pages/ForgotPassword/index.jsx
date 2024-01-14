import { useEffect, useRef, useState } from "react";
import axios from "axios";

import style from "./forgotPassword.module.scss";

export default function ForgotPassword() {
  const inputRef = useRef(null);

  const [email, setEmail] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleForgotPassword = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/forgotPassword`, {
        email,
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={style.forgotPassword}>
      <h1 className={style.title}>ForgotPassword</h1>
      <form onSubmit={handleForgotPassword} className={style.formContainer}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            placeholder="Insérez votre email"
            required
            onChange={(e) => setEmail(e.target.value)}
            ref={inputRef}
          />
        </label>
        <div className={style.submitButtonContainer}>
          <button type="submit"> Envoyer email de recuperation</button>{" "}
        </div>
      </form>
    </div>
  );
}
