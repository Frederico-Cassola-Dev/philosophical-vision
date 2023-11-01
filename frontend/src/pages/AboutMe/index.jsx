import singleLogoLittle from "../../assets/logo/single_logo_little.png";
import aboutMePhoto from "../../assets/images/photo-frederico_cassola-min.png";

import style from "./_aboutMe.module.scss";

export default function AboutMe() {
  return (
    <div className={style.aboutMe}>
      <div className={style.titleContainer}>
        <h1 className={style.title}>
          Frederico
          <img src={singleLogoLittle} alt="logo" />
          <span className={style.subTitle}>Cassola</span>
        </h1>
      </div>
      <div className={style.imgAndDescriptionContainer}>
        <div className={style.aboutMeDescription}>
          <p className={style.descriptionText}>
            Je suis un amoureux de la sagesse et la signification étymologique
            du mot philosophie est "L'amour de la sagesse".
            <br />
            La pratique de la philosophie est connue sous le nom de "L'Art de
            Vivre" et avec cette application, je peux aider tout le monde à
            appliquer certaines connaissances dans nos comportements et pensées
            à partir de différentes visions philosophiques.
            <br />
            Je suis un développeur web full-stack en JavaScript avec un amour
            pour la philosophie.
            <br />
            En assemblant mes deux amours, il a été possible de partager une
            certaine sagesse philosophique qui peut aider la vie de chacun.
            <br />
          </p>
        </div>
        <div className={style.imgContainer}>
          <img src={aboutMePhoto} alt="" />
        </div>
      </div>
    </div>
  );
}
