/* eslint-disable prefer-const */
import resolveConfig from "tailwindcss/resolveConfig";
// @ts-expect-error temporary workaround
import tailwindConfig from "../../tailwind.config.js";

import { useState, useEffect } from "react";

const useTailwindBreakpoints = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //nested destructuring
  let {
    theme: {
      spacing: {
        "navbar-lg": navbarLg,
        "navbar-sm": navbarSm,
        "navbar-md": navbarMd,
        navbar,
      },
      screens: {
        xl: xlBreakpoint,
        lg: lgBreakpoint,
        md: mdBreakpoint,
        sm: smBreakpoint,
      },
    },
  } = resolveConfig(tailwindConfig);

  xlBreakpoint = parseInt(xlBreakpoint.replace("px", ""), 10);
  lgBreakpoint = parseInt(lgBreakpoint.replace("px", ""), 10);
  mdBreakpoint = parseInt(mdBreakpoint.replace("px", ""), 10);
  smBreakpoint = parseInt(smBreakpoint.replace("px", ""), 10);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    windowWidth,
    navbar,
    navbarSm,
    navbarMd,
    navbarLg,
    smBreakpoint,
    mdBreakpoint,
    xlBreakpoint,
    lgBreakpoint,
  };
};

export default useTailwindBreakpoints;
