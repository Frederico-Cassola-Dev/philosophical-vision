import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedLayout from "./layouts/ProtectedLayout";
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
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="aboutMe" element={<AboutMe />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          {/* private routes  */}
          <Route element={<ProtectedLayout />}>
            <Route path="phrases" element={<Phrases />} />
            <Route path="admin" element={<Admin />} />
            <Route path="admin/newAuthor" element={<NewAuthor />} />
            <Route path="admin/newEvent" element={<NewEvent />} />
            <Route path="admin/tablesDb/:table" element={<TablesDB />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
