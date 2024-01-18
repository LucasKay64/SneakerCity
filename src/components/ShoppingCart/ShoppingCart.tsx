import { BoxContainer } from "../BoxContainer/BoxContainer";
import DropdownMenuMobile from "../DropdownMenuMobile/DropdownMenuMobile";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import { FloatingActionButton } from "../FAB/FloatingActionButton";

import Backdrop from "../Backdrop/Backdrop";
import CrossIconWhite from "../../assets/icons/cross-icon-white.svg";
import { Button } from "../Button/Button";

import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import {
  selectIsCartOpen,
  toggleCartOpen,
  selectCartItems,
  selectTotalCartPrice,
} from "../../store/cartSlice/cartSlice";

const ShoppingCart = () => {
  const dispatch = useAppDispatch();

  const isCartOpen = useAppSelector(selectIsCartOpen);
  const cartItems = useAppSelector(selectCartItems);
  const totalCartPrice = useAppSelector(selectTotalCartPrice);

  const isCartEmpty = cartItems.length === 0;

  const handleToggleCartOpen = () => {
    dispatch(toggleCartOpen());
  };

  return (
    <>
      {/* hidden on lg display */}
      <DropdownMenuMobile isMenuOpen={isCartOpen}>
        <div className="px-4">
          <h1 className="text-2xl font-bold text-center">Cart</h1>
          {isCartEmpty ? (
            <p className="text-center py-5">Your cart is empty.</p>
          ) : (
            cartItems.map(({ id, name, price, quantity, image_url }) => (
              <ShoppingCartItem
                key={id}
                id={id}
                name={name}
                price={price}
                size={"7"}
                quantity={quantity}
                image_url={image_url}
              />
            ))
          )}

          <div className="flex justify-between py-2">
            <p className="font-bold text-lg">Total</p>
            <p className="font-bold text-lg">{`$${totalCartPrice}`}</p>
          </div>
          <Button className="w-full">Checkout</Button>
        </div>
      </DropdownMenuMobile>

      {isCartOpen && (
        <FloatingActionButton
          className="fixed 
            bottom-5 left-1/2 -translate-x-1/2
            lg:hidden
            z-40 "
          onClick={handleToggleCartOpen}
        >
          <img src={CrossIconWhite} alt="close cart icon" className="h-6 w-6" />
        </FloatingActionButton>
      )}

      {/* visible on lg display */}
      <BoxContainer
        className={`
            hidden lg:fixed md:top-navbar-md right-2 min-w-[33%] px-4 
            lg:grid transition-all duration-500 ease-in-out z-40
            ${
              isCartOpen
                ? "grid-rows-[1fr] py-2"
                : "grid-rows-[0fr] border-none"
            }
        `}
      >
        <div className="overflow-hidden">
          <div className="max-h-[calc(100vh-12rem)] overflow-y-scroll">
            <h1 className="text-2xl font-bold text-center">Cart</h1>
            {isCartEmpty ? (
              <p className="text-center py-5">Your cart is empty.</p>
            ) : (
              cartItems.map(({ id, name, price, quantity, image_url }) => (
                <ShoppingCartItem
                  key={id}
                  id={id}
                  name={name}
                  price={price}
                  size={"7"}
                  quantity={quantity}
                  image_url={image_url}
                />
              ))
            )}
          </div>
          <hr />
          <div className="flex justify-between py-2">
            <p className="font-bold text-lg">Total</p>
            <p className="font-bold text-lg">{`$${totalCartPrice}`}</p>
          </div>
          <Button
            className="w-full"
            disabled={isCartEmpty}
            variant={isCartEmpty ? "disabled" : "default"}
          >
            Checkout
          </Button>
        </div>
      </BoxContainer>

      <Backdrop isVisible={isCartOpen} onBackdropClick={handleToggleCartOpen} />
    </>
  );
};

export default ShoppingCart;
