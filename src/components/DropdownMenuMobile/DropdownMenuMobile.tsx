interface DropdownMenuMobileProps {
  isMenuOpen: boolean;
  children: React.ReactNode;
}

const DropdownMenuMobile = ({
  isMenuOpen,
  children,
}: DropdownMenuMobileProps) => {
  return (
    <ul
      className={`
            fixed
            overflow-hidden
            top-navbar sm:top-navbar-sm md:top-navbar-md left-0 right-0
            bg-white
            grid transition-all duration-500 ease-in-out
            ${isMenuOpen ? "grid-rows-[1fr] py-2" : "grid-rows-[0fr]"}
            z-40

            lg:hidden
        `}
    >
      <div
        // flex flex-col items-center
        className="
          overflow-hidden
        "
      >
        {children}
      </div>
    </ul>
  );
};

export default DropdownMenuMobile;
