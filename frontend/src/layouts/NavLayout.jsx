import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function NavLayout() {
  return (
    <>
      <Header /> <Outlet />
    </>
  );
}

export default NavLayout;
