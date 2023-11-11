import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const NavbarFooterLayout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-navbar">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default NavbarFooterLayout;
