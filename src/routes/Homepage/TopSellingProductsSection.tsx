import TopSellingProductsTopWave from "../../assets/images/TopSellingProductsTopWave.svg";
import TopSellingProductsBottomWave from "../../assets/images/TopSellingProductsBottomWave.svg";
import {
  ProductCard,
  ProductCardImage,
  ProductCardTitle,
  ProductCardDescription,
  ProductCardPrice,
  ProductCardButton,
} from "../../components/ProductCard/ProductCard";

import HeroImage from "../../assets/images/heroImage.png";

const TopSellingProductsSection = () => {
  return (
    <section className="bg-blue-primary/80 relative pt-10 pb-16 px-10 md:px-16 lg:px-24">
      <h3 className="text-center text-2xl font-bold text-white py-4">
        Top Selling Products
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {Array.from({ length: 6 }, (_, index) => (
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

      <img
        src={TopSellingProductsTopWave}
        draggable="false"
        className="absolute top-0 left-0 w-full overflow-hidden leading-[0rem] h-12"
      />
      <img
        src={TopSellingProductsBottomWave}
        draggable="false"
        className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0rem] h-12"
      />
    </section>
  );
};

export default TopSellingProductsSection;
