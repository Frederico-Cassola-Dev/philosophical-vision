import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Phrases from "./pages/Phrases";
import Admin from "./pages/Admin";
import NewAuthor from "./pages/Admin/NewAuthor";
import NewEvent from "./pages/Admin/NewEvent";
import TablesDB from "./pages/Admin/TablesDB";

import "./scss/styles.scss";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="aboutme" element={<AboutMe />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="phrases" element={<Phrases />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin/newauthor" element={<NewAuthor />} />
          <Route path="admin/newevent" element={<NewEvent />} />
          <Route path="admin/tablesdb/:table" element={<TablesDB />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
