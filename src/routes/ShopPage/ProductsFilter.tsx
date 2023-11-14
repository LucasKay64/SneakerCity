import { FloatingActionButton } from "../../components/FAB/FloatingActionButton";
import DropdownMenuMobile from "../../components/DropdownMenuMobile/DropdownMenuMobile";
import Backdrop from "../../components/Backdrop/Backdrop";

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
        <p> filter 1</p>
        <p> filter 2</p>
        <p> filter 3</p>
        <p> filter 1</p>
        <p> filter 2</p>
        <p> filter 3</p>
      </DropdownMenuMobile>

      {/* filters on desktop view */}
      <div className="hidden lg:block">
        <div className="flex items-center px-4">
          <p className="font-bold text-xl">Filters</p>
          <img src={FilterIconBlack} alt="filter icon" className="h-6 w-6" />
        </div>
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
