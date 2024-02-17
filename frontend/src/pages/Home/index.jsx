import useAxios from "../../hooks/useAxios";

import singleLogoLittle from "../../assets/logo/singleLogoLittle.png";
import style from "./home.module.scss";

export default function Home() {
  const phrasesData = useAxios({
    method: "get",
    endpoint: "phrases3",
  });

  return (
    <div className={style.home}>
      <main className={style.main}>
        <div className={style.titleContainer}>
          <h1 className={style.title}>
            <img src={singleLogoLittle} width="84" height="48" alt="logo" />
            Vision
            <span className={style.subTitle}>Philosophique</span>
          </h1>
        </div>
        <section className={style.descriptionSection}>
          <p className={style.descriptionText}>
            Ce site propose diverses perspectives philosophiques du monde
            entier, abordant des situations communes et quotidiennes de la vie..
          </p>
        </section>
        <section className={style.randomPhrasesSection}>
          {phrasesData?.response?.map((item, index) => (
            <p className={style[`phrase${index}`]} key={item.id}>
              {item.phrase}
            </p>
          ))}
        </section>
      </main>
    </div>
  );
}
