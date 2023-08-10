import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="sign-in">
      <form action="" className="form-container">
        <label htmlFor="email">
          E-mail
          <input type="email" id="email" />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" id="password" />
        </label>
        <div className="submit-button-container">
          <Link to="/logged">
            <button type="button">Submit</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
