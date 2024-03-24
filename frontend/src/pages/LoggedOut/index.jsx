import style from "./loggedOut.module.scss";

export default function LoggedOut() {
  return (
    <div className={style.loggedOut}>
      <p className={style.message}>Vous êtes déconnecté</p>
    </div>
  );
}
