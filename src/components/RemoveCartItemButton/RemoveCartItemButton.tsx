import { Button } from "../Button/Button";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { removeItemFromCartById } from "../../store/cartSlice/cartSlice";

interface RemoveCartItemButtonProps {
  cartItemId: number;
}

const RemoveCartItemButton = ({ cartItemId }: RemoveCartItemButtonProps) => {
  const dispatch = useAppDispatch();

  const handleRemoveItemFromCart = () => {
    dispatch(removeItemFromCartById(cartItemId));
  };

  return (
    <Button
      size="none"
      className="w-8 h-8 rounded-md bg-red-500 hover:bg-red-600"
      onClick={handleRemoveItemFromCart}
    >
      X
    </Button>
  );
};

export default RemoveCartItemButton;
