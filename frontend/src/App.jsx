import Footer from "./components/Footer";
import Header from "./components/Header";
import "./scss/styles.scss";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="title-container">
          <h1 className="title">Philosophical Vision</h1>
        </div>
        <section className="description-section">
          <p className="description-text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora
            mollitia ut voluptas minima deleniti atque, dolorem harum animi cum
            distinctio eos expedita esse repudiandae? Fuga amet neque autem
            possimus doloremque.
          </p>
        </section>
        <section className="random-phrases-section">
          <p className="phrase">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            consectetur.
          </p>
          <p className="phrase">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            consectetur.
          </p>
          <p className="phrase">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            consectetur.
          </p>
          <p className="phrase">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            consectetur.
          </p>
          <p className="phrase">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            consectetur.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
