import { Input } from "../../components/Input/Input";
import { useSearchParams } from "react-router-dom";

const FilterSearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value) {
      searchParams.set("searchQuery", value);
    } else {
      searchParams.delete("searchQuery");
    }

    // setting the page to 1 when a filter is applied
    searchParams.set("page", "1");

    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="px-4 pb-4 border-b">
      <p className="font-bold">Search</p>
      <Input
        type="text"
        placeholder="Search products"
        onChange={handleSearchInputChange}
        value={searchParams.get("searchQuery") || ""}
      />
    </div>
  );
};

export default FilterSearchBox;
