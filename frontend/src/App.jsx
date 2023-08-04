import { Link } from "react-router-dom";

import "./scss/styles.scss";

function App() {
  return (
    <div className="app">
      <header>
        <nav>
          <Link to="/signup" className="link">
            Sign-Up
          </Link>
          <Link to="/signin" className="link">
            Sign-in
          </Link>
        </nav>
      </header>
      <main>
        <div className="title-container">
          <h1 className="title">This is the title</h1>
        </div>
        <section className="description-section">
          <p className="description-text">This is the description</p>
        </section>
        <section className="random-phrases-section">
          <p className="phrase">This is the phrase 1</p>
          <p className="phrase">This is the phrase 2</p>
          <p className="phrase">This is the phrase 3</p>
          <p className="phrase">This is the phrase 4</p>
          <p className="phrase">This is the phrase 5</p>
        </section>
      </main>
      <footer>
        <ul>
          <li>
            <a href="#Facebook">Facebook</a>
          </li>
          <li>
            <a href="#Instagram">Instagram</a>
          </li>
          <li>
            <a href="#LinkedIn">LinkedIn</a>
          </li>
          <li>
            <a href="#GitHub">GitHub</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
