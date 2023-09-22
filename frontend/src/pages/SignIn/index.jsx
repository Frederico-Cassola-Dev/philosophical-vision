import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import style from "./_signIn.module.scss";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        email,
        password,
      })
      .then((response) => {
        console.info(response.data);
        if (response.data.isLogged) {
          navigate("/phrases");
        } else {
          console.info(response.data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={style.signIn}>
      <form onSubmit={(e) => login(e)} className={style.formContainer}>
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className={style.submitButtonContainer}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
