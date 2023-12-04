import {
  AccordionDropdown,
  AccordionDropdownHeader,
  AccordionDropdownContent,
} from "../../components/AccordionDropdown/AccordionDropdown";
import FilterCheckboxGroup from "./FilterCheckboxGroup";

const ProductsFilterOptions = () => {
  return (
    <>
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
    </>
  );
};

export default ProductsFilterOptions;
