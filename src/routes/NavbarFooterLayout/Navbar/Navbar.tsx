import CrossIcon from "../../../assets/icons/cross-icon.svg";
import HamburgerMenuIcon from "../../../assets/icons/hamburger-menu-icon.svg";
import Logo from "../../../assets/images/logo.svg";
import ShoppingCartBlack from "../../../assets/icons/shopping-cart-black.svg";
import ShoppingCartWhite from "../../../assets/icons/shopping-cart-white.svg";

import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";

import NavLink from "../../../components/NavLink/NavLink";
import DropdownMenuMobile from "../../../components/DropdownMenuMobile/DropdownMenuMobile";
import Backdrop from "../../../components/Backdrop/Backdrop";
import { Button } from "../../../components/Button/Button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenuOpen = () => {
    setIsMenuOpen((menuOpen) => !menuOpen);
  };

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`
            flex justify-between items-center
            fixed top-0 w-full z-40
            py-2 px-2 sm:px-10 sm:py-3 md:px-16 lg:px-24

            ${isMenuOpen || isScrolled ? "bg-white shadow-md" : ""}
        `}
      >
        <img
          src={isMenuOpen ? CrossIcon : HamburgerMenuIcon}
          alt="menu"
          className="w-8 sm:w-10 md:w-12 lg:hidden"
          onClick={toggleMenuOpen}
        />

        <Link to="/">
          <img src={Logo} alt="logo" className="w-8 sm:w-10 md:w-12 lg:w-14" />
        </Link>

        {/* dropdown menu visible on mobile view only */}
        <DropdownMenuMobile isMenuOpen={isMenuOpen}>
          <div className="flex flex-col items-center">
            <NavLink to="/">Shop</NavLink>
            <NavLink to="/">About</NavLink>
            <NavLink to="/">Contact</NavLink>
            <hr className="w-full my-3" />
            <Button onClick={() => navigate("/sign-in")}>Sign in</Button>
          </div>
        </DropdownMenuMobile>

        {/* inline menu for desktop view */}
        <div className="hidden lg:flex lg:gap-x-20">
          <NavLink to="/shop?page=1">Shop</NavLink>
          <NavLink to="/">About</NavLink>
          <NavLink to="/">Contact</NavLink>
        </div>

        <div
          className="
            flex items-center justify-center
            lg:gap-x-5"
        >
          <Button
            className="hidden lg:block"
            onClick={() => navigate("/auth/sign-in")}
          >
            Sign in
          </Button>

          <img
            src={
              location.pathname === "/"
                ? isMenuOpen || isScrolled
                  ? ShoppingCartBlack
                  : ShoppingCartWhite
                : ShoppingCartBlack
            }
            alt="shopping cart"
            className="w-8 sm:w-10 md:w-12"
          />
        </div>
      </nav>

      <Backdrop isVisible={isMenuOpen} />
    </>
  );
};

export default Navbar;
