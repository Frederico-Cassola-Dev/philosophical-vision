import singleLogoLittle from "../../assets/logo/singleLogoLittle.png";
import aboutMePhoto from "../../assets/images/photo-frederico_cassola-min.png";

import style from "./_aboutMe.module.scss";

export default function AboutMe() {
  return (
    <div className={style.aboutMe}>
      <div className={style.titleContainer}>
        <h1 className={style.title}>
          Frederico
          <img src={singleLogoLittle} width="84" height="48" alt="logo" />
          <span className={style.subTitle}>Cassola</span>
        </h1>
      </div>
      <div className={style.imgAndDescriptionContainer}>
        <div className={style.aboutMeDescriptionWithImage}>
          <p className={style.descriptionText1}>
            Je suis un amoureux de la sagesse et la signification étymologique
            du mot philosophie est "L'amour de la sagesse".
          </p>
          <div className={style.imgContainer}>
            <img src={aboutMePhoto} alt="" />
          </div>
        </div>
        <div className={style.aboutMeDescription}>
          <p className={style.descriptionText2}>
            La pratique de la philosophie est connue sous le nom de "L'Art de
            Vivre" et cette application a l'objectif de pouvoir aider le plus
            grand nombre de personnes à appliquer les connaissances
            philosophiques dans nos comportements et pensées à partir de
            différentes visions associés aux événements quotidiennes de la vie.
          </p>
          <p className={style.descriptionText3}>
            En tant que développeur web full-stack spécialisé en JavaScript,
            React, Node JS et MySQL, je fusionne ma passion pour la
            programmation avec mon amour pour la philosophie.
          </p>
          <p className={style.descriptionText4}>
            En assemblant mes deux amours, il a été possible de partager une
            certaine sagesse philosophique qui peut aider la vie de chacun.
          </p>
        </div>
      </div>
    </div>
  );
}
