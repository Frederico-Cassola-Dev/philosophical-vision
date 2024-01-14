import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import userContext from "../../contexts/userContext";

import DialogNotification from "../../components/DialogNotification";
import style from "./signIn.module.scss";

export default function SignIn() {
  const inputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(
    "Sauvegarder nouvelle phrase"
  );

  const navigate = useNavigate();
  const { setUser, setToken } = useContext(userContext);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const login = (event) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        email,
        password,
      })
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem("user_info", JSON.stringify(response.data));
        if (response.data.user.role_id === 1) {
          navigate("/admin", { replace: true });
        } else {
          navigate("/phrases", { replace: true });
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 404 || err.response.status === 401) {
          setSubmitMessage("Email inconnue ou mot de passe incorrect ");
        }

        setIsDialogOpen(true);
      });
  };

  return (
    <div className={style.signIn}>
      {isDialogOpen && (
        <DialogNotification
          dialogContent={submitMessage}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
      <form onSubmit={login} className={style.formContainer}>
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            ref={inputRef}
          />
        </label>
        <label htmlFor="password">
          Mot de passe
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Link to="/forgotPassword">
          <button type="button" className={style.forgotPasswordBtn}>
            Mot de passe oublié?
          </button>
        </Link>
        <div className={style.submitButtonContainer}>
          <button type="submit">Se connecter</button>
        </div>
      </form>
    </div>
  );
}
