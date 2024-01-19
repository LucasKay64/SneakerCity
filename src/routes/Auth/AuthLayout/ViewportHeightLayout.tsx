import useTailwindBreakpoints from "../../../hooks/useTailwindBreakpoints";

import { Outlet } from "react-router-dom";

interface ViewportHeightLayoutProps {
  className?: string;
  children?: React.ReactNode;
}

const ViewportHeightLayout = ({
  className,
  children,
}: ViewportHeightLayoutProps) => {
  const {
    windowWidth,
    lgBreakpoint,
    navbarLg,
    mdBreakpoint,
    navbar,
    navbarMd,
    navbarSm,
    smBreakpoint,
  } = useTailwindBreakpoints();

  return (
    <section
      className={className}
      style={{
        minHeight: ((): string => {
          if (windowWidth >= lgBreakpoint) {
            return `calc(100vh - ${navbarLg})`;
          } else if (windowWidth >= mdBreakpoint) {
            return `calc(100vh - ${navbarMd})`;
          } else if (windowWidth >= smBreakpoint) {
            return `calc(100vh - ${navbarSm})`;
          } else {
            return `calc(100vh - ${navbar})`;
          }
        })(),
      }}
    >
      {children ? children : <Outlet />}
    </section>
  );
};

export default ViewportHeightLayout;
