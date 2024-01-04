import { RadioButton } from "../../components/RadioButton/RadioButton";

import { useSearchParams } from "react-router-dom";

interface FilterRadioGroupProps {
  groupName: string;
  options: Option[];
}

interface Option {
  id: string;
  value: string;
  label: string;
}

const FilterRadioGroup = ({ groupName, options }: FilterRadioGroupProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    searchParams.set(groupName, value);

    // setting the page to 1 when a filter is applied
    searchParams.set("page", "1");

    setSearchParams(searchParams, { replace: true });
  };

  return (
    <>
      {options.map(({ id, value, label }, index) => (
        <RadioButton
          key={index}
          id={id}
          name={groupName}
          value={value}
          onChange={handleFilterRadioChange}
          defaultChecked={searchParams.get(groupName) === value}
        >
          {label}
        </RadioButton>
      ))}
    </>
  );
};

export default FilterRadioGroup;
