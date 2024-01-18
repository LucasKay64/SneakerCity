import { Button } from "../Button/Button";

import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  removeItemFromCartById,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} from "../../store/cartSlice/cartSlice";

interface ShoppingCartItemProps {
  id: number;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image_url: string;
}

const ShoppingCartItem = ({
  id,
  name,
  price,
  size,
  quantity,
  image_url,
}: ShoppingCartItemProps) => {
  const dispatch = useAppDispatch();

  const handleRemoveItemFromCart = () => {
    dispatch(removeItemFromCartById(id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseCartItemQuantity(id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseCartItemQuantity(id));
  };

  return (
    <>
      <div className="flex flex-col items-center py-3 sm:flex-row sm:justify-between">
        <div className="flex items-center">
          <img src={image_url} className="w-36 h-24" />
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
            onClick={handleDecreaseQuantity}
          >
            -
          </Button>

          <p>{quantity}</p>

          <Button
            size="none"
            className="w-8 h-8 rounded-md bg-gray-100 text-black"
            onClick={handleIncreaseQuantity}
          >
            +
          </Button>

          <Button
            size="none"
            className="w-8 h-8 rounded-md bg-red-600"
            onClick={handleRemoveItemFromCart}
          >
            X
          </Button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ShoppingCartItem;
