import { FloatingActionButton } from "../../components/FAB/FloatingActionButton";
import DropdownMenuMobile from "../../components/DropdownMenuMobile/DropdownMenuMobile";
import Backdrop from "../../components/Backdrop/Backdrop";
import {
  AccordionDropdown,
  AccordionDropdownHeader,
  AccordionDropdownContent,
} from "../../components/AccordionDropdown/AccordionDropdown";
import FilterCheckboxGroup from "../../components/FilterCheckboxGroup/FilterCheckboxGroup";

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
          <AccordionDropdownHeader>Brand</AccordionDropdownHeader>
          <AccordionDropdownContent>
            <FilterCheckboxGroup
              groupName="brand"
              options={[
                { id: "adidas", value: "Adidas", label: "Adidas" },
                { id: "jordan", value: "Jordan", label: "Jordan" },
                { id: "nike", value: "Nike", label: "Nike" },
              ]}
            />
          </AccordionDropdownContent>
        </AccordionDropdown>

        <AccordionDropdown>
          <AccordionDropdownHeader>Colors</AccordionDropdownHeader>
          <AccordionDropdownContent>
            <FilterCheckboxGroup
              groupName="color"
              options={[
                { id: "black", value: "black", label: "Black" },
                { id: "white", value: "white", label: "White" },
                { id: "red", value: "red", label: "Red" },
                { id: "green", value: "green", label: "Green" },
                { id: "blue", value: "blue", label: "Blue" },
                { id: "brown", value: "brown", label: "Brown" },
              ]}
            />
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
