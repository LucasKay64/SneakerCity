import CrossIcon from "../../../assets/icons/cross-icon.svg";
import HamburgerMenuIcon from "../../../assets/icons/hamburger-menu-icon.svg";
import Logo from "../../../assets/images/logo.svg";
import ShoppingCartBlack from "../../../assets/icons/shopping-cart-black.svg";
import ShoppingCartWhite from "../../../assets/icons/shopping-cart-white.svg";

import { useEffect, useState } from "react";

import NavLink from "../../../components/NavLink/NavLink";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
            py-2 px-2

            ${isMenuOpen || isScrolled ? "bg-white shadow-md" : ""}
        `}
      >
        <img
          src={isMenuOpen ? CrossIcon : HamburgerMenuIcon}
          alt="menu"
          className="w-8"
          onClick={toggleMenuOpen}
        />
        <img src={Logo} alt="logo" className="w-8" />
        <ul
          className={`
                fixed
                overflow-hidden
                top-navbar left-0 right-0
                bg-white
                transition-[max-height] duration-500 ease-in-out
                ${isMenuOpen ? "max-h-36" : "max-h-0"}
            `}
        >
          <div className="flex flex-col items-center py-2">
            <NavLink to="/">Shop</NavLink>
            <NavLink to="/">About</NavLink>
            <NavLink to="/">Contact</NavLink>
          </div>
        </ul>

        <img
          src={isMenuOpen || isScrolled ? ShoppingCartBlack : ShoppingCartWhite}
          alt="shopping cart"
          className="w-8"
        />
      </nav>

      {/* backdrop */}
      <div
        className={`
            fixed
            overflow-hidden
            top-navbar left-0 right-0 bottom-0
            transition-[--tw-bg-opacity] duration-500 ease-in-out
            
            ${
              isMenuOpen ? "z-30 bg-black bg-opacity-30 " : "-z-50 bg-opacity-0"
            }
        `}
      ></div>
    </>
  );
};

export default Navbar;