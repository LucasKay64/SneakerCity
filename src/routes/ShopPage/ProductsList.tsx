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

import { useEffect, useState } from "react";

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchData<Product[]>(
        `${
          import.meta.env.VITE_SUPABASE_API_URL
        }/Products?select=id,name,brand,price,color,collection,image_url`
      );

      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <p className="text-center font-bold text-2xl">Our collection</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 py-4">
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductCardImage src={product.image_url} alt={product.name} />
            <ProductCardTitle>{product.name}</ProductCardTitle>
            <ProductCardDescription>
              {product.collection}
            </ProductCardDescription>
            <ProductCardPrice>${product.price}</ProductCardPrice>
            <ProductCardButton>Add to cart</ProductCardButton>
          </ProductCard>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
