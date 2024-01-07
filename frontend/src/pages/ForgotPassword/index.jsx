import { useState } from "react";
import axios from "axios";

import style from "./forgotPassword.module.scss";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

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
      <form onSubmit={handleForgotPassword}>
        <label htmlFor="email">
          Email
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit"> Envoyer email de recuperation</button>
      </form>
    </div>
  );
}
