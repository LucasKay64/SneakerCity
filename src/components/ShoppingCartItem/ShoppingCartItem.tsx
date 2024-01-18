import HeroImage from "../../assets/images/heroImage.png";
import { Button } from "../Button/Button";

interface ShoppingCartItemProps {
  name: string;
  price: number;
  size: string;
}

const ShoppingCartItem = ({ name, price, size }: ShoppingCartItemProps) => {
  return (
    <>
      <div className="flex flex-col items-center py-3 sm:flex-row sm:justify-between">
        <div className="flex items-center">
          <img src={HeroImage} className="w-36 h-24" />
          <div className="flex flex-col">
            <p>{name}</p>
            <p>{`$${price}`}</p>
            <p>Size: {size}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            size="none"
            className="w-8 h-8 rounded-md bg-gray-100 text-black"
          >
            -
          </Button>

          <p>1</p>

          <Button
            size="none"
            className="w-8 h-8 rounded-md bg-gray-100 text-black"
          >
            +
          </Button>

          <Button size="none" className="w-8 h-8 rounded-md bg-red-600">
            X
          </Button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ShoppingCartItem;
