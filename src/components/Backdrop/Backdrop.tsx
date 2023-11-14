interface BackdropProps {
  isVisible: boolean;
}

const Backdrop = ({ isVisible }: BackdropProps) => {
  return (
    <div
      className={`
        fixed
        overflow-hidden
        top-navbar sm:top-navbar-sm md:top-navbar-md left-0 right-0 bottom-0
        transition-[--tw-bg-opacity] duration-500 ease-in-out
        
        ${isVisible ? "z-30 bg-black bg-opacity-30 " : "-z-50 bg-opacity-0"}
    `}
    ></div>
  );
};

export default Backdrop;
