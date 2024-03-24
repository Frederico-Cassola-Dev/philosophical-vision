import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Axios from "axios";

import userContext from "./contexts/userContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import AboutMe from "./pages/AboutMe";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedLayout from "./layouts/ProtectedLayout";
import ProtectedAdminLayout from "./layouts/ProtectedAdminLayout";
import Phrases from "./pages/Phrases";
import MyAccount from "./pages/MyAccount";
import Admin from "./pages/Admin";
import NewAuthor from "./pages/Admin/NewAuthor";
import NewEvent from "./pages/Admin/NewEvent";
import TablesDB from "./pages/Admin/TablesDB";
import LoggedOut from "./pages/LoggedOut";
import FavoritesPhrases from "./pages/FavoritesPhrases";
import NewCategory from "./pages/Admin/NewCategory";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import "./scss/styles.scss";

function App() {
  const { user, setUser, setToken } = useContext(userContext);
  useEffect(() => {
    if (!document.cookie) {
      setUser(null);
      setToken(null);
      localStorage.clear();
    } else {
      setUser(JSON.parse(localStorage.getItem("user_info"))?.user);
    }
  }, []);

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login/success`, {
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          const userData = {
            id: res.data.user[0],
            google_name: res.data.user[1],
            email: res.data.user[2],
            photo: res.data.user[3],
            role_id: 2,
          };
          setUser(userData);

          localStorage.setItem("user_info", JSON.stringify(userData));
        } else {
          console.warn("No status");
        }
      })
      .catch((err) => console.error(err));
  }, []);

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
          <Route path="loggedOut" element={<LoggedOut />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* private routes  */}
          <Route element={<ProtectedLayout userRole={user?.role_id} />}>
            <Route path="phrases" element={<Phrases />} />
            <Route path="myAccount" element={<MyAccount />} />
            <Route path="favorites" element={<FavoritesPhrases />} />
          </Route>
          <Route element={<ProtectedAdminLayout userRole={user?.role_id} />}>
            <Route path="admin" element={<Admin />} />
            <Route path="admin/newAuthor" element={<NewAuthor />} />
            <Route path="admin/newEvent" element={<NewEvent />} />
            <Route path="admin/newCategory" element={<NewCategory />} />
            <Route path="admin/tablesDb/:table" element={<TablesDB />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
