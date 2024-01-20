import { Button } from "../Button/Button";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} from "../../store/cartSlice/cartSlice";

interface CartItemQuantityControlProps {
  cartItemId: number;
  quantity: number;
}

const CartItemQuantityControl = ({
  cartItemId,
  quantity,
}: CartItemQuantityControlProps) => {
  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = () => {
    dispatch(increaseCartItemQuantity(cartItemId));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseCartItemQuantity(cartItemId));
  };

  return (
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
    </div>
  );
};

export default CartItemQuantityControl;
