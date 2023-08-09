import defaultAvatar from "../../assets/images/default_avatar.png";

export default function SignUp() {
  return (
    <div className="sign-up">
      <form action="" className="form-input">
        <div className="avatar-label-input-container">
          <label htmlFor="avatar" className="label-avatar">
            Avatar
            <input type="file" name="" id="avatar" className="input-avatar" />
          </label>
          <div className="avatar-container">
            <img src={defaultAvatar} alt="avatar" />
          </div>
        </div>
        <label htmlFor="lastName" className="label-last-name">
          Nom
          <input
            type="text"
            name=""
            id="lastName"
            className="input-last-name"
          />
        </label>
        <label htmlFor="firstName" className="label-first_name">
          Prénom
          <input
            type="text"
            name=""
            id="firstName"
            className="input-first-name"
          />
        </label>
        <label htmlFor="email" className="label-email">
          E-mail
          <input type="email" name="" id="email" className="input-email" />
        </label>
        <label htmlFor="password-1" className="label-password-1">
          Mot de passe
          <input
            type="password"
            name=""
            id="password-1"
            className="input-password-1"
          />
        </label>
        <label htmlFor="password-2" className="label-password-2">
          Mot de passe
          <input
            type="password"
            name=""
            id="password-2"
            className="input-password-2"
          />
        </label>
        <div className="submit-button-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
