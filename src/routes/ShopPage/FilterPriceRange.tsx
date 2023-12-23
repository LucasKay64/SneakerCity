import { Input } from "../../components/Input/Input";

import { useSearchParams } from "react-router-dom";

import { useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";

const FilterPriceRange = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // passing name as an argument through 2 levels but its kinda better for isolation and separation of concerns imo
  const validatePriceRange = (name: string) => {
    const numericMinPrice = Number(minPrice);
    const numericMaxPrice = Number(maxPrice);

    console.log("validatePriceRange", name);

    // short circuiting
    if (
      name === "minPrice" &&
      numericMinPrice !== 0 &&
      numericMinPrice > numericMaxPrice &&
      numericMaxPrice !== 0
    ) {
      setError("Min price cannot be greater than max price");
      return false;
    } else if (
      name === "maxPrice" &&
      numericMaxPrice !== 0 &&
      numericMaxPrice < numericMinPrice &&
      numericMinPrice !== 0
    ) {
      setError("Max price cannot be less than min price");
      return false;
    }

    setError(null);
    return true;
  };

  const updateSearchParams = useDebounce((name: string) => {
    console.log("updatesearchParams", name);
    if (validatePriceRange(name)) {
      minPrice
        ? searchParams.set("minPrice", minPrice)
        : searchParams.delete("minPrice");
      maxPrice
        ? searchParams.set("maxPrice", maxPrice)
        : searchParams.delete("maxPrice");

      setSearchParams(searchParams, { replace: true });
    }
  }, 300);

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "minPrice") {
      setMinPrice(value);
    } else if (name === "maxPrice") {
      setMaxPrice(value);
    }

    console.log("handlePriceRangeChange", name);
    updateSearchParams(name);
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
          value={minPrice}
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
          value={maxPrice}
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
