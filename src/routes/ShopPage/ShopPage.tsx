import ProductsList from "./ProductsList";
import ProductsFilter from "./ProductsFilter";

import useTailwindBreakpoints from "../../hooks/useTailwindBreakpoints";

const ShopPage = () => {
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
    <section className="lg:flex">
      <div className="lg:flex-1">
        <ProductsFilter />
      </div>
      <div
        className="flex justify-center items-center lg:block lg:flex-[5]"
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
        <ProductsList />
      </div>
    </section>
  );
};

export default ShopPage;
