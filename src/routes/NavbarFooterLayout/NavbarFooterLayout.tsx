import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const NavbarFooterLayout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-navbar">
        <Outlet />
      </div>
    </>
  );
};

export default NavbarFooterLayout;
