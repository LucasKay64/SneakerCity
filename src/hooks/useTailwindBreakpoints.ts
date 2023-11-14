import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";

import { useState, useEffect } from "react";

const useTailwindBreakpoints = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //nested destructuring
  let {
    theme: {
      // eslint-disable-next-line prefer-const
      spacing: { "navbar-lg": navbarLg },
      screens: { xl: xlBreakpoint, lg: lgBreakpoint },
    },
  } = resolveConfig(tailwindConfig);

  xlBreakpoint = parseInt(xlBreakpoint.replace("px", ""), 10);
  lgBreakpoint = parseInt(lgBreakpoint.replace("px", ""), 10);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    windowWidth,
    navbarLg,
    xlBreakpoint,
    lgBreakpoint,
  };
};

export default useTailwindBreakpoints;
