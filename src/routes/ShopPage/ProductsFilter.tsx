import { FloatingActionButton } from "../../components/FAB/FloatingActionButton";
import DropdownMenuMobile from "../../components/DropdownMenuMobile/DropdownMenuMobile";
import Backdrop from "../../components/Backdrop/Backdrop";
import ProductsFilterOptions from "./ProductsFilterOptions";

import FilterIconWhite from "../../assets/icons/filter-icon-white.svg";
import FilterIconBlack from "../../assets/icons/filter-icon-black.svg";

import { useState } from "react";

const ProductsFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilterOpen = () => {
    setIsFilterOpen((filterOpen) => !filterOpen);
  };

  return (
    <div>
      {/* dropdown menu with filters visible on mobile view only */}
      <DropdownMenuMobile isMenuOpen={isFilterOpen}>
        <ProductsFilterOptions />
      </DropdownMenuMobile>

      {/* filters on desktop view */}
      <div className="hidden lg:block">
        <div className="flex items-center px-4 justify-between">
          <p className="font-bold text-xl">Filters</p>
          <img src={FilterIconBlack} alt="filter icon" className="h-6 w-6" />
        </div>
        <ProductsFilterOptions />
      </div>

      <FloatingActionButton
        className="fixed bottom-5 right-5 z-40 lg:hidden"
        onClick={toggleFilterOpen}
      >
        <img src={FilterIconWhite} alt="filter icon" />
      </FloatingActionButton>

      <Backdrop isVisible={isFilterOpen} />
    </div>
  );
};

export default ProductsFilter;
