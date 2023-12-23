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
    const { name, value } = e.target;

    searchParams.set(name, value);

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
          checked={searchParams.get(groupName) === value}
        >
          {label}
        </RadioButton>
      ))}
    </>
  );
};

export default FilterRadioGroup;
