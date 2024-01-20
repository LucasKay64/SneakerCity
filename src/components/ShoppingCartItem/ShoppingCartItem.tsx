import CartItemQuantityControl from "../CartItemQuantityControl/CartItemQuantityControl";
import RemoveCartItemButton from "../RemoveCartItemButton/RemoveCartItemButton";

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
        <div className="flex items-center gap-4 mr-4">
          <CartItemQuantityControl cartItemId={id} quantity={quantity} />

          <RemoveCartItemButton cartItemId={id} />
        </div>
      </div>
      <hr />
    </>
  );
};

export default ShoppingCartItem;
