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
      <div>
        <ProductsFilter />
      </div>
      <div className="lg:flex-1">
        <ProductsList />
      </div>
    </section>
  );
};

export default ShopPage;
