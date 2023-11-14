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
            transition-[max-height] duration-500 ease-in-out
            ${isMenuOpen ? "max-h-36" : "max-h-0"}
            z-40

            lg:hidden
        `}
    >
      <div
        className="
            flex flex-col items-center
            py-2
        "
      >
        {children}
      </div>
    </ul>
  );
};

export default DropdownMenuMobile;
