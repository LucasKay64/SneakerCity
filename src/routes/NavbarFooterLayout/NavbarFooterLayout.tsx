import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const NavbarFooterLayout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-navbar sm:mt-navbar-sm md:mt-navbar-md lg:mt-navbar-lg">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default NavbarFooterLayout;
