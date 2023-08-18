import { useState } from "react";
import defaultAvatar from "../../assets/images/default_avatar.png";

export default function SignUp() {
  // const [avatar, setAvatar] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  return (
    <div className="sign-up">
      <form
        action=""
        className="form-input"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="avatar-label-input-container">
          <label htmlFor="avatar" className="label-avatar">
            Avatar
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="input-avatar"
            />
          </label>
          <div className="avatar-container">
            <img src={defaultAvatar} alt="avatar" />
          </div>
        </div>
        <label htmlFor="lastName" className="label-last-name">
          Nom
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="input-last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label htmlFor="firstName" className="label-first_name">
          Prénom
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="input-first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label htmlFor="email" className="label-email">
          E-mail
          <input
            type="email"
            name="email"
            id="email"
            className="input-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className="label-password-1">
          Mot de passe
          <input
            type="password"
            name="password"
            id="password"
            className="input-password-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="secondPassword" className="label-password-2">
          Mot de passe
          <input
            type="password"
            name="secondPassword"
            id="secondPassword"
            className="input-second-password"
            value={secondPassword}
            onChange={(e) => setSecondPassword(e.target.value)}
          />
        </label>
        <div className="submit-button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
