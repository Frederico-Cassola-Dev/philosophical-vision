import useAxios from "../../hooks/useAxios";

import singleLogoLittle from "../../assets/logo/single_logo_little.png";

import style from "./_home.module.scss";

export default function Home() {
  const phrasesResponse = useAxios({
    method: "get",
    endpoint: "phrases5",
  });

  return (
    <div className={style.home}>
      <main className={style.main}>
        <div className={style.titleContainer}>
          <h1 className={style.title}>
            <img src={singleLogoLittle} alt="logo" />
            Vision
            <span className={style.subTitle}>Philosophical</span>
          </h1>
        </div>
        <section className={style.descriptionSection}>
          <p className={style.descriptionText}>
            This site offers various philosophical perspectives from around the
            world, addressing common and everyday situations in your life.
          </p>
        </section>
        <section className={style.randomPhrasesSection}>
          {phrasesResponse?.map((item, index) => (
            <p className={style[`phrase${index}`]} key={item.id}>
              {item.phrase}
            </p>
          ))}
        </section>
      </main>
    </div>
  );
}
