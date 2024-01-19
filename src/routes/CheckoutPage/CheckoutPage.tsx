import { BoxContainer } from "../../components/BoxContainer/BoxContainer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/Table/Table";
import { Button } from "../../components/Button/Button";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  selectCartItems,
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeItemFromCartById,
  selectTotalCartPrice,
} from "../../store/cartSlice/cartSlice";

const CheckoutPage = () => {
  const cartItems = useAppSelector(selectCartItems);
  const totalCartPrice = useAppSelector(selectTotalCartPrice);
  const dispatch = useAppDispatch();

  const handleDecreaseQuantity = (id: number) => {
    dispatch(decreaseCartItemQuantity(id));
  };

  const handleIncreaseQuantity = (id: number) => {
    dispatch(increaseCartItemQuantity(id));
  };

  const handleRemoveItemFromCart = (id: number) => {
    dispatch(removeItemFromCartById(id));
  };

  return (
    <BoxContainer className="py-5 px-10 overflow-x-auto">
      <Table>
        <TableCaption className="text-2xl text-center font-bold py-2">
          Checkout
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[30rem]">Item</TableHead>
            <TableHead className="min-w-[10rem]">Quantity</TableHead>
            <TableHead className="min-w-[10rem]">Price (Total)</TableHead>
            <TableHead>Remove</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cartItems.map(({ id, image_url, name, price, quantity }) => (
            <TableRow key={id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img src={image_url} className="w-32 h-24" />
                  <div className="flex flex-col">
                    <p>{name}</p>
                    <p>{`$${price}`}</p>
                    <p>Size: {7}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-4">
                  <Button
                    size="none"
                    className="w-8 h-8 rounded-md bg-gray-100 text-black"
                    onClick={() => handleDecreaseQuantity(id)}
                  >
                    -
                  </Button>

                  <p>{quantity}</p>

                  <Button
                    size="none"
                    className="w-8 h-8 rounded-md bg-gray-100 text-black"
                    onClick={() => handleIncreaseQuantity(id)}
                  >
                    +
                  </Button>
                </div>
              </TableCell>
              <TableCell>{`$${price * quantity}`}</TableCell>
              <TableCell className="text-center">
                <Button
                  size="none"
                  className="w-8 h-8 rounded-md bg-red-600"
                  onClick={() => handleRemoveItemFromCart(id)}
                >
                  X
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className="border-t">
          <TableRow className="font-bold text-lg">
            <TableCell colSpan={2} className="pl-20 py-3">
              Total
            </TableCell>
            <TableCell colSpan={2}>{`$${totalCartPrice}`}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Button className="w-full mt-4">Buy now</Button>
    </BoxContainer>
  );
};

export default CheckoutPage;
