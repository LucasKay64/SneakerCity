import {
  ProductCard,
  ProductCardImage,
  ProductCardTitle,
  ProductCardDescription,
  ProductCardPrice,
  ProductCardButton,
} from "../../components/ProductCard/ProductCard";
import { Pagination } from "../../components/Pagination/Pagination";

import { Product } from "../../types/dataTypes";
import { fetchData } from "../../utils/dataUtils";
import { filtersParsingConfig } from "../../configs/filtersParsingConfig";

import { useEffect, useState, useRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

const ProductsList = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  const abortController = useRef<AbortController>();

  const debouncedFetchProducts = useDebounce(async () => {
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

    const data = await fetchData<Product[]>(
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
        Range: "0-7",
      }
    );

    // &or=(brand.like.Adidas,brand.like.Nike)&or=(color.like.*white*,color.like.*green*)

    setProducts(data);
  }, 500);

  useEffect(() => {
    debouncedFetchProducts();

    return () => {
      abortController.current?.abort();
      debouncedFetchProducts.cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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

      <Pagination page={5} totalPages={10} />
    </div>
  );
};

export default ProductsList;
