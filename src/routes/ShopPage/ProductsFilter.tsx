import { FloatingActionButton } from "../../components/FAB/FloatingActionButton";
import DropdownMenuMobile from "../../components/DropdownMenuMobile/DropdownMenuMobile";
import Backdrop from "../../components/Backdrop/Backdrop";
import {
  AccordionDropdown,
  AccordionDropdownHeader,
  AccordionDropdownContent,
} from "../../components/AccordionDropdown/AccordionDropdown";

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
        <AccordionDropdown>
          <AccordionDropdownHeader>Filter 1</AccordionDropdownHeader>
          <AccordionDropdownContent>
            <p>Filter 1</p>
            <p>Filter 2</p>
            <p>Filter 3</p>
            <p>Filter 4</p>
            <p>Filter 5</p>
            <p>Filter 6</p>
            <p>Filter 7</p>
          </AccordionDropdownContent>
        </AccordionDropdown>

        <AccordionDropdown>
          <AccordionDropdownHeader>Filter 2</AccordionDropdownHeader>
          <AccordionDropdownContent>
            <p>Filter 1</p>
            <p>Filter 2</p>
            <p>Filter 3</p>
            <p>Filter 4</p>
            <p>Filter 5</p>
            <p>Filter 6</p>
            <p>Filter 7</p>
          </AccordionDropdownContent>
        </AccordionDropdown>
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
