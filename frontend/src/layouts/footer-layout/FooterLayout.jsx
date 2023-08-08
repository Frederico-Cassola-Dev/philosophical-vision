import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function FooterLayout() {
  return (
    <>
      <Footer /> <Outlet />
    </>
  );
}

export default FooterLayout;
