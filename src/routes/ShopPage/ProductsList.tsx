import {
  ProductCard,
  ProductCardImage,
  ProductCardTitle,
  ProductCardDescription,
  ProductCardPrice,
  ProductCardButton,
} from "../../components/ProductCard/ProductCard";

import { Product } from "../../types/dataTypes";
import { fetchData } from "../../utils/dataUtils";
import { filtersParsingConfig } from "../../configs/filtersParsingConfig";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ProductsList = () => {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    const filterQueries: string[] = [];

    for (const [key, value] of Object.entries(currentParams)) {
      const config = filtersParsingConfig[key];

      if (config) {
        filterQueries.push(config.buildQuery(value));
      }
    }

    const fetchProducts = async () => {
      const data = await fetchData<Product[]>(
        `${
          import.meta.env.VITE_SUPABASE_API_URL
        }/Products?select=id,name,price,collection,image_url&${filterQueries.join(
          "&"
        )}`
      );

      // &or=(brand.like.Adidas,brand.like.Nike)&or=(color.like.*white*,color.like.*green*)

      setProducts(data);
    };

    fetchProducts();
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
    </div>
  );
};

export default ProductsList;
