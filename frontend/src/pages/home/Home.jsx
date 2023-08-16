import useAxios from "../../common/hooks/useAxios";

import singleLogoLittle from "../../assets/logo/single_logo_little.png";

export default function Home() {
  const phrasesResponse = useAxios({
    method: "get",
    endpoint: "phrases5",
  });

  return (
    <div className="home">
      <main className="main">
        <div className="title-container">
          <h1 className="title">
            <img src={singleLogoLittle} alt="logo" />
            Vision
            <span className="sub-title">Philosophical</span>
          </h1>
        </div>
        <section className="description-section">
          <p className="description-text">
            This site offers various philosophical perspectives from around the
            world, addressing common and everyday situations in your life.
          </p>
        </section>
        <section className="random-phrases-section">
          {phrasesResponse?.map((item, index) => (
            <p className={`phrase phrase-${index}`} key={item.id}>
              {item.phrase}
            </p>
          ))}
        </section>
      </main>
    </div>
  );
}
