import {
  AccordionDropdown,
  AccordionDropdownHeader,
  AccordionDropdownContent,
} from "../../components/AccordionDropdown/AccordionDropdown";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import FilterPriceRange from "./FilterPriceRange";
import FilterSearchBox from "./FilterSearchBox";
import FilterRadioGroup from "./FilterRadioGroup";

const ProductsFilterOptions = () => {
  return (
    <div className="my-3">
      <FilterSearchBox />

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
              { id: "orange", value: "orange", label: "Orange" },
            ]}
          />
        </AccordionDropdownContent>
      </AccordionDropdown>

      <AccordionDropdown>
        <AccordionDropdownHeader>Price</AccordionDropdownHeader>
        <AccordionDropdownContent>
          <FilterPriceRange />
        </AccordionDropdownContent>
      </AccordionDropdown>

      <AccordionDropdown>
        <AccordionDropdownHeader>Sort</AccordionDropdownHeader>
        <AccordionDropdownContent>
          <FilterRadioGroup
            groupName="sort"
            options={[
              {
                id: "price_asc",
                value: "price.asc",
                label: "Price: Low to High",
              },
              {
                id: "price_desc",
                value: "price.desc",
                label: "Price: High to Low",
              },
            ]}
          />
        </AccordionDropdownContent>
      </AccordionDropdown>
    </div>
  );
};

export default ProductsFilterOptions;
