import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./layouts/footer-layout/components/Footer";
import Header from "./layouts/header-layout/components/Header";
import Home from "./pages/home/Home";
import AboutMe from "./pages/about-me/AboutMe";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import Phrases from "./pages/phrases/Phrases";

import "./scss/styles.scss";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="aboutme" element={<AboutMe />} />
          <Route path="phrases" element={<Phrases />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
