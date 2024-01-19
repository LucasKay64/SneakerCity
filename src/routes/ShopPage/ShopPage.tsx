import ProductsList from "./ProductsList";
import ProductsFilter from "./ProductsFilter";

import ViewportHeightLayout from "../Auth/AuthLayout/ViewportHeightLayout";

const ShopPage = () => {
  return (
    <section className="lg:flex">
      <div className="lg:flex-1">
        <ProductsFilter />
      </div>
      <ViewportHeightLayout className="flex justify-center items-center lg:block lg:flex-[5]">
        <ProductsList />
      </ViewportHeightLayout>
    </section>
  );
};

export default ShopPage;
