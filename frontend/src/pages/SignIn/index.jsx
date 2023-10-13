import { Link } from "react-router-dom";

import style from "./signIn.module.scss";

export default function SignIn() {
  return (
    <div className={style.signIn}>
      <form action="" className={style.formContainer}>
        <label htmlFor="email">
          E-mail
          <input type="email" id="email" />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" id="password" />
        </label>
        <div className={style.submitButtonContainer}>
          <Link to="/phrases">
            <button type="button">Submit</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
