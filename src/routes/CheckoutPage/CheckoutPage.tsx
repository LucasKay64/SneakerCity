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
import CartItemQuantityControl from "../../components/CartItemQuantityControl/CartItemQuantityControl";
import RemoveCartItemButton from "../../components/RemoveCartItemButton/RemoveCartItemButton";

import { useAppSelector } from "../../hooks/reduxHooks";
import {
  selectCartItems,
  selectTotalCartPrice,
} from "../../store/cartSlice/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const cartItems = useAppSelector(selectCartItems);
  const totalCartPrice = useAppSelector(selectTotalCartPrice);
  const navigate = useNavigate();

  return (
    <BoxContainer className="py-5 px-10 overflow-x-auto lg:min-w-[30rem]">
      {cartItems.length === 0 ? (
        <>
          <p className="text-center py-5">Your cart is empty.</p>
          <Button className="w-full mt-4" onClick={() => navigate("/shop")}>
            Back to Shop
          </Button>
        </>
      ) : (
        <>
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
                    <CartItemQuantityControl
                      cartItemId={id}
                      quantity={quantity}
                    />
                  </TableCell>
                  <TableCell>{`$${price * quantity}`}</TableCell>
                  <TableCell className="text-center">
                    <RemoveCartItemButton cartItemId={id} />
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
        </>
      )}
    </BoxContainer>
  );
};

export default CheckoutPage;
