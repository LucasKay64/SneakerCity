import { Link } from "react-router-dom";

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
}

const NavLink = ({ children, to }: NavLinkProps) => {
  return (
    <Link to={to}>
      <li
        className="
        text-xl text-black
        py-2
        inline-block
        relative

        before:content-['']
        before:absolute
        before:left-0
        before:bottom-0
        before:w-0
        before:h-1
        before:bg-blue-primary
        before:ease-in-out
        before:duration-300
        before:bg-gradient-to-r from-blue-primary to-blue-secondary

        hover:before:w-full
      "
      >
        {children}
      </li>
    </Link>
  );
};

export default NavLink;
