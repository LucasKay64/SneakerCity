import { Input } from "../../components/Input/Input";

import { useSearchParams } from "react-router-dom";

import { useState } from "react";

const FilterPriceRange = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);
    const minPrice = Number(searchParams.get("minPrice"));
    const maxPrice = Number(searchParams.get("maxPrice"));

    setError(null);

    if (name === "minPrice") {
      if (numericValue > maxPrice && maxPrice !== 0) {
        setError("Min price cannot be greater than max price");
        return;
      }
    } else if (name === "maxPrice") {
      if (numericValue < minPrice && minPrice !== 0) {
        setError("Max price cannot be less than min price");
        return;
      }
    }

    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }

    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div>
      <p className="text-sm text-gray-500">Price range</p>
      <div className="flex items-center justify-between mt-2">
        <Input
          type="number"
          inputSize="sm"
          placeholder="Min"
          min="0"
          max="1000"
          name="minPrice"
          onChange={handlePriceRangeChange}
        />
        <span className="text-gray-500 mx-2">-</span>
        <Input
          type="number"
          inputSize="sm"
          placeholder="Max"
          min="0"
          max="1000"
          name="maxPrice"
          onChange={handlePriceRangeChange}
        />
      </div>
      {error && (
        <div>
          <p className="text-red-500 text-sm mt-1">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FilterPriceRange;
