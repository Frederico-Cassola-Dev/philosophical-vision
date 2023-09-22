import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import userContext from "../../contexts/userContext";

import style from "./_signIn.module.scss";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);
  // console.log("🚀 - user:", user);

  const login = (e) => {
    e.preventDefault();

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.info(response.data);
        setUser(response.data.user);
        navigate("/phrases");
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
