import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./layouts/footer-layout/components/Footer";
import Header from "./layouts/header-layout/components/Header";
import Home from "./pages/home/Home";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import Logged from "./pages/logged/Logged";

import "./scss/styles.scss";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="logged" element={<Logged />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
