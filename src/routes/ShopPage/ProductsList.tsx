import {
  ProductCard,
  ProductCardImage,
  ProductCardTitle,
  ProductCardDescription,
  ProductCardPrice,
  ProductCardButton,
} from "../../components/ProductCard/ProductCard";
import { Pagination } from "../../components/Pagination/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import InfoMessage from "../../components/InfoMessage/InfoMessage";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import { Product } from "../../types/dataTypes";
import { fetchData } from "../../utils/dataUtils";
import {
  filtersParsingConfig,
  ITEMS_PER_PAGE,
} from "../../configs/filtersParsingConfig";

import { useEffect, useState, useRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

import NotFoundIcon from "../../assets/icons/not-found-icon.svg";

const ProductsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const abortController = useRef<AbortController>();

  const debouncedFetchProducts = useDebounce(async () => {
    setIsLoading(true);
    setError("");

    abortController.current?.abort();
    abortController.current = new AbortController();

    const currentParams = Object.fromEntries([...searchParams]);
    const filterQueries: string[] = [];

    for (const [key, value] of Object.entries(currentParams)) {
      const config = filtersParsingConfig[key];

      if (config) {
        filterQueries.push(config.buildQuery(value));
      }
    }

    try {
      const { data, headers } = await fetchData<Product[]>(
        `${
          import.meta.env.VITE_SUPABASE_API_URL
        }/Products?select=id,name,price,collection,image_url&${filterQueries.join(
          "&"
        )}`,
        {
          signal: abortController.current.signal,
        },
        {
          Prefer: "count=exact",
        }
      );

      const totalNumOfItems = Number(
        headers.get("Content-Range")?.split("/")[1]
      );
      const totalPages = Math.ceil(totalNumOfItems / ITEMS_PER_PAGE);

      setTotalPages(totalPages);
      setProducts(data);
    } catch (error) {
      // If the error is due to aborting the fetch, don't show an error message
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setError(
        "Something went wrong with loading the products. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }, 300);

  useEffect(() => {
    debouncedFetchProducts();

    return () => {
      abortController.current?.abort();
      debouncedFetchProducts.cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handlePaginationChange = (page: number) => {
    searchParams.set("page", page.toString());

    setSearchParams(searchParams, { replace: true });
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <InfoMessage
          icon={NotFoundIcon}
          message="No products found matching the selected filters."
        />
      </div>
    );
  }

  return (
    <div>
      <p className="text-center font-bold text-2xl">Our collection</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 py-4">
        {products.map(({ id, image_url, name, collection, price }) => (
          <ProductCard key={id}>
            <ProductCardImage src={image_url} alt={name} />
            <ProductCardTitle>{name}</ProductCardTitle>
            <ProductCardDescription>{collection}</ProductCardDescription>
            <ProductCardPrice>${price}</ProductCardPrice>
            <ProductCardButton>Add to cart</ProductCardButton>
          </ProductCard>
        ))}
      </div>

      <Pagination
        page={searchParams.get("page") ? Number(searchParams.get("page")) : 1}
        totalPages={totalPages}
        onPageChange={handlePaginationChange}
      />
    </div>
  );
};

export default ProductsList;
