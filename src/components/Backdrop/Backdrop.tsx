interface BackdropProps {
  isVisible: boolean;
  onBackdropClick?: () => void;
}

const Backdrop = ({ isVisible, onBackdropClick }: BackdropProps) => {
  return (
    <div
      className={`
        fixed
        overflow-hidden
        top-navbar sm:top-navbar-sm md:top-navbar-md lg:top-navbar-lg left-0 right-0 bottom-0
        transition-[--tw-bg-opacity] duration-500 ease-in-out
        
        ${isVisible ? "z-30 bg-black bg-opacity-30 " : "-z-50 bg-opacity-0"}
    `}
      onClick={onBackdropClick}
    ></div>
  );
};

export default Backdrop;
