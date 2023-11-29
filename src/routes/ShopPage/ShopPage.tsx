import ProductsList from "./ProductsList";
import ProductsFilter from "./ProductsFilter";

import useTailwindBreakpoints from "../../hooks/useTailwindBreakpoints";

const ShopPage = () => {
  const { windowWidth, lgBreakpoint, navbarLg } = useTailwindBreakpoints();

  return (
    <section
      className="lg:flex"
      style={{
        minHeight:
          windowWidth >= lgBreakpoint ? `calc(100vh - ${navbarLg})` : "0",
      }}
    >
      <div className="lg:flex-1">
        <ProductsFilter />
      </div>
      <div className="lg:flex-[5]">
        <ProductsList />
      </div>
    </section>
  );
};

export default ShopPage;
