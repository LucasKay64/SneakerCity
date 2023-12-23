import { Checkbox } from "../../components/Checkbox/Checkbox";

import { useSearchParams } from "react-router-dom";

interface FilterCheckboxGroupProps {
  groupName: string;
  options: Option[];
}

interface Option {
  id: string;
  value: string;
  label: string;
}

const FilterCheckboxGroup = ({
  groupName,
  options,
}: FilterCheckboxGroupProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, name, value } = e.target;

    const appliedFilters = searchParams.get(name)?.split(",") || [];

    if (checked) {
      appliedFilters.push(value);
      searchParams.set(name, appliedFilters.join(","));
    } else {
      const newFilters = appliedFilters.filter((filter) => filter !== value);

      if (newFilters.length === 0) {
        searchParams.delete(name);
      } else {
        searchParams.set(name, newFilters.join(","));
      }
    }

    setSearchParams(searchParams, { replace: true });
  };
  return (
    <>
      {options.map(({ id, value, label }, index) => (
        <Checkbox
          key={index}
          id={id}
          name={groupName}
          value={value}
          onChange={handleFilterCheckboxChange}
          checked={searchParams.get(groupName)?.includes(value) || false}
        >
          {label}
        </Checkbox>
      ))}
    </>
  );
};

export default FilterCheckboxGroup;
