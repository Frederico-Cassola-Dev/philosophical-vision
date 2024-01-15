import { useEffect, useRef, useState } from "react";
import axios from "axios";

import DialogNotification from "../../components/DialogNotification";
import style from "./forgotPassword.module.scss";

export default function ForgotPassword() {
  const inputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleForgotPassword = (event) => {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/forgotPassword`, {
        email,
      })
      .then((response) => {
        if (response.status === 200) {
          setSubmitMessage("Email envoyé avec success");
          setIsDialogOpen(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setSubmitMessage("Ce email n'est pas enregistré");
        }

        if (err.response.status === 500) {
          setSubmitMessage("Problème rencontré, essayez à nouveau");
        }
        setIsDialogOpen(true);
      });
  };

  return (
    <div className={style.forgotPassword}>
      {isDialogOpen && (
        <DialogNotification
          dialogContent={submitMessage}
          setIsDialogOpen={setIsDialogOpen}
        />
      )}
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
          <button type="submit"> Envoyer l'email de recuperation</button>{" "}
        </div>
      </form>
    </div>
  );
}
