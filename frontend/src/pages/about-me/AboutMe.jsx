import singleLogoLittle from "../../assets/logo/single_logo_little.png";

export default function AboutMe() {
  return (
    <div className="about-me">
      <div className="title-container">
        <h1 className="title">
          Frederico
          <img src={singleLogoLittle} alt="logo" />
          <span className="sub-title">Cassola</span>
        </h1>
      </div>
      <div className="about-me-description">
        <p className="description-text">
          I'm a lover of wisdom and the etymological meaning of philosophie is
          "The love of wisdom". <br />
          The practice of philosophie is known as "The Art of Living" and with
          this app I can help everyone to apply some knowledge in our
          comportements and thoughts from different visions of philosophical
          currents. <br />
          I'm a full-stack web developer in JavaScript with a love for
          philosophie. <br />
          Assembling my two loves it was possible to share some philosophical
          wisdom that can help everyone's life.
          <br />
        </p>
      </div>
    </div>
  );
}
