import {
  ProductCard,
  ProductCardImage,
  ProductCardTitle,
  ProductCardDescription,
  ProductCardPrice,
  ProductCardButton,
} from "../../components/ProductCard/ProductCard";

import HeroImage from "../../assets/images/heroImage.png";

const ProductsList = () => {
  return (
    <div>
      {/* list of products */}
      <p className="text-center font-bold text-2xl">Our collection</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 py-4">
        {Array.from({ length: 10 }, (_, index) => (
          <ProductCard key={index}>
            <ProductCardImage src={HeroImage} alt="Nike Air Force 1" />
            <ProductCardTitle>Nike Air Force 1</ProductCardTitle>
            <ProductCardDescription>
              Adidas x jordan collab
            </ProductCardDescription>
            <ProductCardPrice>$100</ProductCardPrice>
            <ProductCardButton>Add to cart</ProductCardButton>
          </ProductCard>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
